import { createLazyFileRoute } from "@tanstack/react-router";
import { Chat } from "../components/Chat.tsx";

export const Route = createLazyFileRoute("/chat")({
  component: Chat,
});
