import colors from "@/utils/ghcolors.json";
import { GetRepositories } from "@/utils/graphql/queries.ts";
import { useQuery } from "@apollo/client";
import { User } from "@auth0/auth0-react";
import { Circle, GitBranch, Star, Search } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";

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
  const { data, loading, error } = useQuery(GetRepositories);

  const filteredRepos = data?.getRepositories?.repositories?.filter((repo) =>
    repo?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return <div>Loading repositories...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error fetching repositories, {user?.name}</div>;
  }

  const jsonColors = colors as ColorData;

  return (
    <div className="w-full h-full">
      <div className="mb-6">
        <div className="relative">
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
      </div>
      <div className="h-full flex flex-wrap gap-4 mt-4 content-start ">
        {(filteredRepos ?? []).map((repo) => (
          <Card
            key={repo?.id}
            className="w-full bg-transparent shadow-none max-h-28"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {repo?.isPrivate ? (
                    <Circle className="text-gray-500" size={16} />
                  ) : (
                    <Circle className="text-green-500" size={16} />
                  )}
                  <CardTitle className="text-white text-lg font-semibold">
                    <a href={repo?.url} target="_blank" rel="noreferrer">
                      {repo?.name}
                    </a>
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
