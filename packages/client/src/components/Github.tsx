import { Repository } from "@/gql/graphql.ts";
import { GetRepositories } from "@/utils/graphql/queries.ts";
import { useQuery } from "@apollo/client";
import { User } from "@auth0/auth0-react";
import { Search } from "lucide-react";
import { useCallback, useState } from "react";
import { RepoCard } from "./RepoCard.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.tsx";
import { Spinner } from "./ui/spinner.tsx";

interface GithubProps {
  user: User | undefined;
  setDialogOpen: (open: boolean) => void;
  setRepositoryId: (id: number) => void;
}

export const Github = ({
  user,
  setDialogOpen,
  setRepositoryId,
}: GithubProps) => {
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

  const handleOpenDialog = (id: number) => {
    setRepositoryId(id);
    setDialogOpen(true);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  if (error) {
    console.error(error);
    return <div>Error fetching repositories, {user?.name}</div>;
  }

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
          <RepoCard
            key={repo.id}
            repo={repo}
            handleOpenDialog={handleOpenDialog}
          ></RepoCard>
        ))}
      </div>
    </div>
  );
};
