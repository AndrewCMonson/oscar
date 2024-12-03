import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const ChatMessageList = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    className={cn(
      "flex flex-col w-full h-full p-4 gap-6 overflow-y-auto",
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
  </div>
));

ChatMessageList.displayName = "ChatMessageList";
