import { Project } from "@/__generated__/graphql.js";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router";
import { ChatGPTMessage } from "../../../api/types/index.js";
import { GetUser, HandleConversationMessage } from "../utils/graphql/index.js";
import { Chatbox } from "./Chatbox.js";
import { ChatSidebar } from "./ChatSideBar.js";
import { CreateProjectDialog } from "./CreateProjectDialog.js";
import { LoadingScreen } from "./LoadingScreen.js";
import { Button } from "./ui/button/button.js";
import { SidebarTrigger } from "./ui/sidebar.js";
import { Textarea } from "./ui/textarea.js";

export const Chat = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [messages, setMessages] = useState<ChatGPTMessage[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [userMessage, setUserMessage] = useState<ChatGPTMessage>({
    content: "",
    role: "user",
    name: `${user?.name}`,
  });
  const [selectedProject, setSelectedProject] = useState<string | null>(() => {
    const projectId = searchParams.get("projectId");
    return projectId ? projectId : null;
  });
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const updateMessages = useCallback((message: ChatGPTMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const [chat, { loading }] = useMutation(HandleConversationMessage, {
    onCompleted: (data) => {
      console.log(data);
      updateMessages({
        content: data.handleConversationMessage.content,
        role: "assistant",
        name: "assistant",
      });
      if (selectedProject === null) {
        setSelectedProject(data.handleConversationMessage.projectId);
        setSearchParams({ projectId: data.handleConversationMessage.projectId });
      }
    },
    onError: (error) => console.log(error),
  });

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setUserMessage({
      content: event.target.value,
      role: "user",
      name: `${user?.name}`,
    });

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userMessage.content === "") return;
    updateMessages(userMessage);
    setUserMessage({
      content: "",
      role: "user",
      name: `${user?.name}`,
    });
    await chat({
      variables: { message: userMessage.content },
    });
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();

      setUserMessage({
        ...userMessage,
        content: `${userMessage.content}\n`,
      });
    }
    if (e.key === "Enter" && !e.shiftKey && userMessage.content !== "") {
      e.preventDefault();
      updateMessages(userMessage);
      setUserMessage({
        content: "",
        role: "user",
        name: `${user?.name}`,
      });
      await chat({
        variables: {
          message: userMessage.content,
          projectId: selectedProject,
        },
      });
    }
  };

  const handleProjectSelection = (projectId: string | null) => {
    setSelectedProject(projectId);
    if (projectId) {
      setSearchParams({ projectId });
    } else {
      setSearchParams({});
    }
  };

  const { data: userData } = useQuery(GetUser, {
    variables: { auth0Sub: user?.sub ?? "" },
    pollInterval: 1000,
  });

  const userProjects = userData?.user?.projects;

  useEffect(() => {
    if (userProjects) {
      const project = userProjects.find(
        (project) => project?.id === selectedProject,
      );
      if (project) {
        const messages = project?.conversation?.messages?.map((message) => {
          return {
            role: message?.role,
            content: message?.content,
            name: message?.name ?? "",
          };
        }) as ChatGPTMessage[];
        setMessages(messages);
      }
    }
  }, [selectedProject, userProjects]);

  if (!isAuthenticated) {
    return (
      <LoadingScreen message="Please login to interface with the assistant" />
    );
  }

  if (isLoading) {
    return <LoadingScreen message="Loading Oscar" />;
  }

  return (
    isAuthenticated && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex max-h-[calc(100vh-4rem)]"
        >
          <ChatSidebar
            projects={
              userProjects?.filter((project) => project !== null) as Project[]
            }
            selectedProject={selectedProject ?? ""}
            handleProjectSelection={handleProjectSelection}
            setOpen={setDialogOpen}
            setMessages={setMessages}
          />
          <CreateProjectDialog open={dialogOpen} setOpen={setDialogOpen} setSelectedProject={setSelectedProject}/>
          <SidebarTrigger className="absolute top-2" />
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto flex w-full max-w-4xl flex-col items-center justify-center space-y-4 sm:space-y-6 p-4 sm:p-8"
          >
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                duration: 0.5,
              }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
            >
              Chat with Oscar
            </motion.h1>

            <Chatbox
              messages={messages}
              picture={user?.picture}
              loading={loading}
            />

            <Textarea
              className="w-full sm:w-3/4 mt-2 border border-gray-600 rounded-lg bg-zinc-900 p-2 resize-none border-gray-700"
              value={userMessage.content}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your text here"
              aria-label="Chat input field"
            />

            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-xl hover:scale-105 transition-transform rounded-lg px-6 py-2 mt-2"
              size="lg"
              onClick={handleSubmit}
              type="submit"
              aria-label="Submit chat message"
            >
              Chat
            </Button>
          </motion.div>
        </motion.div>
        <div
          className="absolute top-1/3 left-1/2 w-56 sm:w-72 h-56 sm:h-72 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute top-2/3 right-1/3 w-56 sm:w-72 h-56 sm:h-72 bg-purple-600/20 rounded-full blur-3xl -translate-x-1/2 -z-10"
          aria-hidden="true"
        />
      </>
    )
  );
};
