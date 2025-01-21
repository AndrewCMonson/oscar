import { Repository } from "@/gql/graphql.ts";
import colors from "@/utils/ghcolors.json";
import { GetRepositories } from "@/utils/graphql/queries.ts";
import { useQuery } from "@apollo/client";
import { User } from "@auth0/auth0-react";
import { Circle, GitBranch, Search, Star, CircleCheckBig, CirclePlus } from "lucide-react";
import { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.tsx";
import { Spinner } from "./ui/spinner.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip.tsx";

interface GithubProps {
  user: User | undefined;
}

interface LanguageColor {
  color: string | null;
  url: string;
}

interface ColorData {
  [key: string]: LanguageColor;
}

export const Github = ({ user }: GithubProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sort, setSort] = useState<string>("latestActivity");
  const { data, loading, error } = useQuery(GetRepositories);

  const filteredRepos = data?.getRepositories?.repositories?.filter((repo) =>
    repo?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortRepos = useCallback(
    (repos: Repository[]) => {
      switch (sort) {
        case "latestActivity":
          return repos.sort((a, b) => {
            if (a.latestActivityDate && b.latestActivityDate) {
              return (
                new Date(b.latestActivityDate).getTime() -
                new Date(a.latestActivityDate).getTime()
              );
            } else if (a.latestActivityDate) {
              return -1;
            } else if (b.latestActivityDate) {
              return 1;
            } else {
              return 0;
            }
          });
        case "stars":
          return repos.sort((a, b) => (b?.stars ?? 0) - (a?.stars ?? 0));
        case "language":
          return repos.sort((a, b) =>
            (b?.language ?? "").localeCompare(a?.language ?? ""),
          );
        default:
          return repos;
      }
    },
    [sort],
  );

  const handleSortChange = (value: string) => {
    setSort(value);
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

  if (error) {
    console.error(error);
    return <div>Error fetching repositories, {user?.name}</div>;
  }

  const jsonColors = colors as ColorData;

  return (
    <div className="w-full h-full">
      <div className="mb-6 w-full justify-between flex">
        <div className="relative w-2/3">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search repositories..."
            className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none bg-transparent text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-1/3 flex justify-end content-center">
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px] h-full pl-4 pr-2 py-2 border rounded focus:outline-none bg-transparent text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latestActivity">Latest activity</SelectItem>
              <SelectItem value="stars">Stars</SelectItem>
              <SelectItem value="language">Language</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="h-full flex flex-wrap gap-4 mt-4 content-start ">
        {loading && (
          <div className="w-full flex items-center justify-center">
            <Spinner className="w-12 h-12 text-white text-center" />
          </div>
        )}
        {filteredRepos?.length === 0 && (
          <div className="text-white">No repositories found</div>
        )}
        {sortRepos(
          (filteredRepos ?? []).filter(
            (repo): repo is Repository => repo !== null,
          ),
        ).map((repo) => (
          <Card
            key={repo?.id}
            className="w-full bg-transparent shadow-none max-h-28"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {repo?.isPrivate ? (
                    <Circle
                      className="text-gray-500"
                      size={16}
                      aria-label="private repository"
                    />
                  ) : (
                    <Circle
                      className="text-green-500"
                      size={16}
                      aria-label="public repository"
                    />
                  )}
                  <CardTitle className="text-white text-lg font-semibold flex gap-2">
                    <a href={repo?.url} target="_blank" rel="noreferrer">
                      {repo?.name}
                    </a>
                    {repo.projectId ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <CircleCheckBig height={16}/>
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
              {/* <p className="text-zinc-500 mb-2">{repo?.description}</p> */}
              <div className="flex flex-wrap gap-2 mb-3">
                {(repo?.topics ?? []).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
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
                      <div>{repo?.language}</div>
                    </>
                  )}
                </div>
                <div className="text-zinc-500">
                  {repo?.latestActivityDate && (
                    <span>
                      Last activity: {formatDate(repo?.latestActivityDate)}
                    </span>
                  )}
                </div>
                {/* <div className="flex items-center gap-4">
                  {repo.isInDatabase ? (
                    <span className="text-green-600">In Database ✓</span>
                  ) : (
                    <span className="text-gray-400">Not in Database</span>
                  )}
                </div> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
