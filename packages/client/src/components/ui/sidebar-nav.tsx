import { cn } from "@/lib/utils";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  items: {
    selectedItem: string;
    name: string;
    title: string;
  }[];
}

export function SidebarNav({
  selectedItem,
  setSelectedItem,
  className,
  items,
  ...props
}: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <div
          key={item.name}
          className={cn(
            "text-white cursor-pointer flex p-2 rounded",

            selectedItem === item.name ? "bg-white bg-opacity-10" : "",
          )}
          onClick={() => setSelectedItem(item.name)}
        >
          <p className="text-sm font-semibold">{item.title}</p>
        </div>
      ))}
    </nav>
  );
}
