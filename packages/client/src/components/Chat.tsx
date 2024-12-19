import { Project } from "@/__generated__/graphql.js";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router";
import { ChatGPTMessage } from "../../../api/types/index.js";
import { GetUser, HandleConversationMessage } from "../utils/graphql/index.js";
import { LoadingScreen } from "./LoadingScreen.js";
import { ProjectList } from "./ProjectList.js";
import { Button } from "./ui/button/button.js";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "./ui/chat/chat-bubble.js";
import { ChatMessageList } from "./ui/chat/chat-message-list.js";
import { Input } from "./ui/input.js";

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
  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = debounce(() => {
      if (chatListRef.current) {
        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      }
    }, 100);

    scrollToBottom();
    return () => scrollToBottom.cancel();
  }, [messages]);

  const updateMessages = useCallback((message: ChatGPTMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const [chat, { loading }] = useMutation(HandleConversationMessage, {
    onCompleted: (data) => {
      updateMessages({
        content: data.handleConversationMessage.content,
        role: "assistant",
        name: "assistant",
      });
    },
    onError: (error) => console.log(error),
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUserMessage({
      content: event.target.value,
      role: "user",
      name: `${user?.name}`,
    });

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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

  const handleProjectSelection = (projectId: string) => {
    setSelectedProject(projectId);
    setSearchParams({ projectId });
  };

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GetUser, {
    variables: { auth0Sub: user?.sub ?? "" },
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
        <div className="bg-zinc-900 text-white p-4">
          {userLoading && <p>Loading...</p>}
          {!userLoading && userError && <p>Error: {userError.message}</p>}
          {userProjects && (
            <ProjectList
              projects={
                userProjects?.filter((project) => project !== null) as Project[]
              }
              selectedProject={selectedProject ?? ""}
              handleProjectSelection={handleProjectSelection}
            />
          )}
        </div>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          role="main"
          className="flex flex-col justify-center items-center px-4 py-12 lg:py-24 "
        >
          <div className="flex w-full max-w-4xl flex-col items-center justify-center space-y-4 sm:space-y-6">
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

            <ChatMessageList
              className="w-full h-72 sm:h-80 md:h-96 flex flex-col overflow-y-auto border border-gray-700 rounded-lg bg-zinc-900"
              aria-label="Chat messages"
              ref={chatListRef}
            >
              {messages.map((message, i) =>
                message.role === "user" ? (
                  <ChatBubble
                    key={i}
                    variant="sent"
                    layout="default"
                    className="flex items-center"
                  >
                    <ChatBubbleAvatar src={user?.picture} />
                    <ChatBubbleMessage>{message.content}</ChatBubbleMessage>
                  </ChatBubble>
                ) : message.role === "assistant" ? (
                  <ChatBubble
                    key={i}
                    variant="received"
                    className="flex items-center"
                  >
                    <ChatBubbleAvatar />
                    <ChatBubbleMessage>{message.content}</ChatBubbleMessage>
                  </ChatBubble>
                ) : null,
              )}
              {loading && (
                <ChatBubble variant="received">
                  <ChatBubbleAvatar />
                  <ChatBubbleMessage isLoading />
                </ChatBubble>
              )}
            </ChatMessageList>

            <Input
              className="w-full sm:w-3/4 lg:w-1/2 mt-2 border border-gray-600 rounded-lg bg-zinc-900 p-2"
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
          </div>
        </motion.main>

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
