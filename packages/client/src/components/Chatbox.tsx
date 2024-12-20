import { useEffect, useRef } from "react";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "./ui/chat/chat-bubble.js";
import { ChatMessageList } from "./ui/chat/chat-message-list.js";
import { ChatGPTMessage } from "../../../api/types/index.js";
import { debounce } from "lodash";

interface ChatboxProps {
  messages: ChatGPTMessage[];
  picture: string | undefined;
  loading: boolean;
}

export const Chatbox = ({ messages, picture, loading }: ChatboxProps) => {
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

  return (
    <ChatMessageList
      className="w-full h-72 sm:h-80 md:h-96 flex flex-col overflow-y-auto border border-gray-700 rounded-lg bg-zinc-900"
      aria-label="Chat messages"
      ref={chatListRef}
    >
      {messages &&
        messages.map((message, i) =>
          message.role === "user" ? (
            <ChatBubble
              key={i}
              variant="sent"
              layout="default"
              className="flex items-center"
            >
              <ChatBubbleAvatar src={picture} />
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
  );
};
