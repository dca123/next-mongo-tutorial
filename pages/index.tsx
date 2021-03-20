import useSWR from 'swr';
import { useUser, fetcher } from '../lib/hooks';

function UserList() {
  const { data: { users } = {} } = useSWR(`/api/users`, fetcher);
  return (
    <>
      <h2>All users</h2>
      {!!users?.length && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </li>
          ))}

          <style jsx>{`
            pre {
              white-space: pre-wrap;
              word-wrap: break-word;
            }
          `}</style>
        </ul>
      )}
    </>
  );
}

export default function HomePage() {
  const [user] = useUser();
  return (
    <>
      <h1>Steam Passport + next-connect Example</h1>
      {user && (
        <>
          <p>Currently logged in as:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
      {/* <UserList /> */}
      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </>
  );
}
