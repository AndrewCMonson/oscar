import { useMutation } from "@apollo/client";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button.js";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "./components/ui/chat/chat-bubble.js";
import { ChatMessageList } from "./components/ui/chat/chat-message-list.js";
import { Input } from "./components/ui/input.js";
import { HandleConversationMessage } from "./utils/graphql/mutations.js";
import { LoginButton } from "./components/LoginButton.js";
import { LogoutButton } from "./components/LogoutButton.js";
import Profile from "./components/Profile.js";

interface ChatMessage {
  content: string;
  role: string;
}

export const App = () => {
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

  return (
    <>
      <div className="flex flex-row justify-center h-full w-full items-center">
        <LoginButton></LoginButton>
        <LogoutButton></LogoutButton>
        <div className="flex h-3/4 w-1/2 flex-col items-center justify-center">
          <ChatMessageList
            className="w-full h-96 flex-col overflow-y-auto border rounded"
            ref={chatListRef}
          >
            {messages.map((message, i) =>
              message.role === "user" ? (
                <ChatBubble key={i} variant="sent" layout="default">
                  <ChatBubbleAvatar></ChatBubbleAvatar>
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
            className="w-96 mt-2"
            value={userMessage.content}
            onChange={handleInputChange}
            placeholder="Enter your text here"
          ></Input>
          <Button className="mt-2 rounded" size="lg" onClick={handleSubmit}>
            Chat
          </Button>
          <Profile />
        </div>
      </div>
    </>
  );
};
