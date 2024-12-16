import { createFileRoute, redirect } from "@tanstack/react-router";
import { Chat } from "../components/Chat.tsx";

export const Route = createFileRoute("/chat")({
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Chat,
});
