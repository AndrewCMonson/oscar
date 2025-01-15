import { GetRepositories } from "@/utils/graphql/queries.ts";
import { useQuery } from "@apollo/client";
import { User } from "@auth0/auth0-react";

interface GithubProps {
  user: User | undefined;
}
export const Github = ({ user }: GithubProps) => {
  const { data, error } = useQuery(GetRepositories);

  if (error) {
    console.error(error);
    return <div>Error fetching repositories, {user?.name}</div>;
  }

  const repoData = data?.getRepositories?.repositories?.map((repo) => {
    return (
      <div className="flex " key={repo?.name}>
        <a href={repo?.url} target="_blank" rel="noreferrer">
          <p>{repo?.name}</p>
        </a>
      </div>
    );
  });

  return <div className="flex flex-col gap-4 flex-wrap">{repoData}</div>;
};
