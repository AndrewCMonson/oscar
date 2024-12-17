import { createFileRoute } from "@tanstack/react-router";
import { Profile } from "../components/Profile.tsx";

export const Route = createFileRoute("/profile")({
  component: Profile,
});
