import { useMutation } from "@apollo/client";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState, KeyboardEvent } from "react";
import { HandleConversationMessage } from "../utils/graphql/mutations.js";
import { Button } from "./ui/button/button.js";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "./ui/chat/chat-bubble.js";
import { motion } from "framer-motion"
import { ChatMessageList } from "./ui/chat/chat-message-list.js";
import { Input } from "./ui/input.js";
import { useAuth0 } from "@auth0/auth0-react";

interface ChatMessage {
  content: string;
  role: string;
}

export const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userMessage, setUserMessage] = useState<ChatMessage>({
    content: "",
    role: "",
  });
  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  const updateMessages = (message: ChatMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const [chat, { loading }] = useMutation(HandleConversationMessage, {
    onCompleted: (data) => {
      updateMessages({
        content: data.handleConversationMessage.content,
        role: "assistant",
      });
    },
    onError: (error) => console.log(error),
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUserMessage({
      content: event.target.value,
      role: "user",
    });

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateMessages(userMessage);
    setUserMessage({
      content: "",
      role: "",
    });
    await chat({
      variables: { message: userMessage.content },
    });
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement> ) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      updateMessages(userMessage);
      setUserMessage({
        content: "",
        role: "",
      });
      await chat({
        variables: { message: userMessage.content },
      });
    }
  }

  const { user } = useAuth0();

  if (!user) {
    return (
      <div className="text-center">
        <p>You must be logged in to interact with the assistant</p>
      </div>
    );
  }

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center h-full"
      >
        <div className="flex h-3/4 w-1/2 flex-col items-center justify-center">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              duration: 0.5,
            }}
            className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          >
            Chat with Oscar
          </motion.h1>
          <ChatMessageList
            className="w-full h-96 flex-col overflow-y-auto border border-4 rounded bg-zinc-900"
            ref={chatListRef}
          >
            {messages.map((message, i) =>
              message.role === "user" ? (
                <ChatBubble key={i} variant="sent" layout="default">
                  <ChatBubbleAvatar src={user?.picture}></ChatBubbleAvatar>
                  <ChatBubbleMessage>{message.content}</ChatBubbleMessage>
                </ChatBubble>
              ) : (
                <ChatBubble key={i} variant="received">
                  <ChatBubbleAvatar></ChatBubbleAvatar>
                  <ChatBubbleMessage>{message.content}</ChatBubbleMessage>
                </ChatBubble>
              ),
            )}
            {loading && (
              <ChatBubble variant="received">
                <ChatBubbleAvatar></ChatBubbleAvatar>
                <ChatBubbleMessage isLoading></ChatBubbleMessage>
              </ChatBubble>
            )}
          </ChatMessageList>
          <Input
            className="w-96 mt-2 border bg-zinc-900"
            value={userMessage.content}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter your text here"
          ></Input>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform rounded mt-2"
            size="lg"
            onClick={handleSubmit}
            type="submit"
          >
            Chat
          </Button>
        </div>
      </motion.main>
      <div
        className="absolute top-1/3 left-1/2 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-2/3 right-1/3 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl -translate-x-1/2 -z-10"
        aria-hidden="true"
      />
    </>
  );
};
