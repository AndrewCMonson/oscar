import { createLazyFileRoute } from "@tanstack/react-router";
import { OscarLandingPage } from "@/components/LandingPage.tsx";

export const Route = createLazyFileRoute("/")({
  component: OscarLandingPage,
});
