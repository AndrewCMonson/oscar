import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Repository } from "@/gql/graphql.ts";
import colors from "@/utils/ghcolors.json";
import {
  CircleCheckBig,
  CirclePlus,
  Expand,
  GitBranch,
  Minimize,
  Star,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip.tsx";

interface RepoCardProps {
  repo: Repository;
  handleOpenDialog: (id: number) => void;
}

interface LanguageColor {
  color: string | null;
  url: string;
}

interface ColorData {
  [key: string]: LanguageColor;
}

export const RepoCard = ({ repo, handleOpenDialog }: RepoCardProps) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const jsonColors = colors as ColorData;

  return (
    <Card
      key={repo.id}
      className={`
        w-full 
        relative
        bg-gray-800
        shadow-none 
        overflow-hidden 
        transition-all 
        duration-700
        ease-in-out  ${expandedCard === repo.id ? "max-h-[500px]" : "max-h-[200px]"}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-white text-lg font-semibold flex gap-2">
              <a href={repo?.url} target="_blank" rel="noreferrer">
                {repo?.name}
              </a>
              {repo.projectId ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link to={`/chat?projectId=${repo.projectId}`}>
                        <CircleCheckBig height={16} />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>Chat exists</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CirclePlus
                        height={16}
                        className="cursor-pointer"
                        onClick={() => handleOpenDialog(repo.id)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>Create Chat</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </CardTitle>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center text-white gap-1">
              <Star size={16} color="white" />
              {repo?.stars}
            </div>
            <div className="flex items-center text-white gap-1">
              <GitBranch size={16} color="white" />
              {repo?.forks}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex items-center gap-2 text-white">
          {repo?.language && (
            <>
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor:
                    jsonColors[repo?.language]?.color ?? "transparent",
                }}
              />
              <div className="text-sm">{repo?.language}</div>
            </>
          )}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto"></div>
        {expandedCard === repo.id && (
          <div className=" text-white space-y-3">
            <div>
              <strong>Description:</strong>
              <p>{repo.description || "No description available"}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {(repo?.topics ?? []).map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-zinc-200">
          {repo?.latestActivityDate && (
            <span>Last activity: {formatDate(repo?.latestActivityDate)}</span>
          )}
        </div>
        <div
          onClick={() => toggleCard(repo.id)}
          className="cursor-pointer text-blue-400 hover:text-blue-600 transition"
        >
          {expandedCard === repo.id ? (
            <Minimize size={20} />
          ) : (
            <Expand size={20} />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
