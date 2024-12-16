import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
  // notFoundComponent: NotFoundRoute
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}

// function NotFoundRoute() {
//   return (
//     <div>
//       <h3>This Route Doesn't Exist!</h3>
//     </div>
//   )
// }
