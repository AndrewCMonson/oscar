import { GetRepositories } from "@/utils/graphql/queries.ts";
import { useQuery } from "@apollo/client";
import { User } from "@auth0/auth0-react";

interface GithubProps {
  user: User | undefined;
}
const Github = ({ user }: GithubProps) => {
  const { data, error } = useQuery(GetRepositories);

  if (error) {
    console.error(error);
    return <div>Error fetching repositories</div>;
  }

  const repoData = data?.getRepositories?.repositories?.map((repo) => {
    return (
      <div key={repo?.name}>
        <a href={repo?.url} target="_blank" rel="noreferrer">
          {repo?.name}
        </a>
        <p>{repo?.description}</p>
        <p>{user?.email}</p>
      </div>
    );
  });

  return <div>{repoData}</div>;
};
export default Github;
