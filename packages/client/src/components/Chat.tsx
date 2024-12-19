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
import { ChatGPTMessage, Project } from "../../../api/types/index.js";
import {
  GetUserProjects,
  HandleConversationMessage,
} from "../utils/graphql/index.js";
import { Button } from "./ui/button/button.js";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "./ui/chat/chat-bubble.js";
import { ChatMessageList } from "./ui/chat/chat-message-list.js";
import { Input } from "./ui/input.js";
import { useSearchParams } from "react-router";

export const Chat = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [messages, setMessages] = useState<ChatGPTMessage[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [userMessage, setUserMessage] = useState<ChatGPTMessage>({
    content: "",
    role: "user",
    name: `${user?.name}`,
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(() => {
    const projectId = searchParams.get("projectId");
    return projectId
      ? {
          id: projectId,
          createdAt: "",
          name: "",
          type: "",
          updatedAt: "",
          userId: "",
        }
      : null;
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
          projectId: selectedProject?.id,
        },
      });
    }
  };

  const handleProjectSelection = (project: Project) => {
    setSelectedProject(project);
    setSearchParams({ projectId: project.id });

    console.log("Current Project", project);
  };

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GetUserProjects, {
    variables: { auth0sub: user?.sub },
    pollInterval: 5000,
  });
  
  // TODO: FIX THIS TYPECASTING
  useEffect(() => {
    if (selectedProject?.conversation?.messages) {
      const messages = selectedProject.conversation.messages.map((message) => {
        return {
          role: message?.role,
          content: message?.content,
          name: message?.user?.username ?? "",
        };
      }) as ChatGPTMessage[];

      setMessages(messages ?? []);
    }

    if(!selectedProject?.conversation?.messages){
      setMessages([]);
    }
  }, [selectedProject]);

  if (!isAuthenticated) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white relative flex items-center justify-center"
      >
        <p className="text-2xl text-zinc-400">
          Please login to interface with the assistant
        </p>
      </motion.main>
    );
  }

  if (isLoading) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white relative flex items-center justify-center"
      >
        <p className="text-2xl text-zinc-400">Loading Oscar</p>
      </motion.main>
    );
  }

  return (
    isAuthenticated && (
      <>
        {/* Main content */}
        <div className="bg-zinc-900 text-white p-4">
          {projectLoading && <p>Loading...</p>}
          {!projectLoading && projectError && (
            <p>Error: {projectError.message}</p>
          )}
          {!projectLoading && !projectError && projectData && (
            <ul>
              {projectData.user.projects.map((project: Project) => (
                <li key={project.id}>
                  <p
                    onClick={() => handleProjectSelection(project)}
                    className={`cursor-pointer ${selectedProject?.id === project.id ? "text-blue-400" : ""}`}
                  >
                    {project.name}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          role="main" // ARIA role
          className="flex flex-col justify-center items-center px-4 py-12 lg:py-24 "
        >
          {/* Content wrapper */}
          <div className="flex w-full max-w-4xl flex-col items-center justify-center space-y-4 sm:space-y-6">
            {/* Accessible heading */}
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

            {/* Chat Message List */}
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

            {/* Input Field */}
            <Input
              className="w-full sm:w-3/4 lg:w-1/2 mt-2 border border-gray-600 rounded-lg bg-zinc-900 p-2"
              value={userMessage.content}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your text here"
              aria-label="Chat input field"
            />

            {/* Submit Button */}
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

        {/* Decorative elements */}
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
