import { getUsers } from '../services/users';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
export const Users = () => {
  const result = useQuery(['users'], getUsers);

  if (result.isLoading) return <div>Loading...</div>;
  if (result.isError) return <div>{result.error}</div>;

  return (
    <div>
      <table>
        <caption>Users</caption>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Blogs Created</th>
          </tr>
          {result.data.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
