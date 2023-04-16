import { getUsers } from '../services/users';
import { useQuery } from 'react-query';
import { Route, Link as RouteLink } from 'react-router-dom';
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Link,
} from '@chakra-ui/react';

export const Users = () => {
  const result = useQuery(['users'], getUsers);

  if (result.isLoading) return <div>Loading...</div>;
  if (result.isError) return <div>{result.error}</div>;

  return (
    <TableContainer w={500} margin="0 auto">
      <Table mt={5} variant="simple" size="sm">
        <TableCaption>User List</TableCaption>
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Blogs Created</Th>
          </Tr>
        </Thead>
        <Tbody>
          {result.data.map((user) => {
            return (
              <Tr key={user.id}>
                <Td>
                  <Link
                    to={`/users/${user.id}`}
                    as={RouteLink}
                    color="#2831d4aa"
                  >
                    {user.name}
                  </Link>
                </Td>
                <Td>{user.blogs.length}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
