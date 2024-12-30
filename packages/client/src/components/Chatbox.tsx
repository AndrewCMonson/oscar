import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble.js";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list.js";
import { containsMarkdown } from "@/utils/containsMarkdown.js";
import { ChatGPTMessage } from "@oscar/types/index.js";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
      className={`w-full  flex flex-col overflow-y-auto border border-gray-700 rounded-lg bg-zinc-900 no-scrollbar border border-gray-700 ${messages.length < 2 ? "h-96" : ""}`}
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
              <ChatBubbleMessage>
                {containsMarkdown(message.content) ? (
                  <div>
                    <ReactMarkdown
                      components={{
                        code({ className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return match ? (
                            <>
                              <div className="absolute left-1 pl-5 z-10">
                                {match[1]}
                              </div>
                              <SyntaxHighlighter
                                language={match[1]}
                                PreTag="div"
                                style={materialDark}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            </>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  message.content
                )}
              </ChatBubbleMessage>
            </ChatBubble>
          ) : message.role === "assistant" ? (
            <ChatBubble
              key={i}
              variant="received"
              className="flex items-center"
            >
              <ChatBubbleAvatar />
              <ChatBubbleMessage>
                {containsMarkdown(message.content) ? (
                  <div>
                    <ReactMarkdown
                      components={{
                        code({ className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return match ? (
                            <>
                              <div className="absolute right-0 pr-5  bg-gray z-10">
                                {match[1]}
                              </div>
                              <SyntaxHighlighter
                                language={match[1]}
                                PreTag="div"
                                style={materialDark}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            </>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  message.content
                )}
              </ChatBubbleMessage>
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
