import { useState, useContext, useRef } from 'react';
import { UserContext } from '../context/UserContext';
import { useNotifDispatch } from '../context/NotificationContext';
import { useQuery } from 'react-query';
import { getAll, setToken } from '../services/blogs';
import { login } from '../services/auth';
import { Login } from '../components/Login';
import ToggleDiv from '../components/ToggleDiv';
import { CreateBlog } from '../components/CreateBlog';
import { Link as RouteLink } from 'react-router-dom';
import {
  Flex,
  Box,
  Heading,
  Link,
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
export const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, userDispatch] = useContext(UserContext);
  const notifDispatch = useNotifDispatch();
  const blogFormRef = useRef();
  const results = useQuery(['blogs'], getAll);
  const blogs = results.data;

  const setNotification = (payload) => {
    notifDispatch({
      type: 'show',
      payload,
    });
    setTimeout(() => notifDispatch({ type: 'hide' }), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem('blogUser', JSON.stringify(user));
      if (user) {
        userDispatch({ type: 'SET', payload: user });
        setToken(user.token);
        setUsername('');
        setPassword('');
        setNotification({
          notif: 'Logged In!',
          notifType: 'success',
        });
      }
    } catch (err) {
      setNotification({ notif: err.response.data.error, notifType: 'error' });
    }
  };

  const handleChange = (e) => {
    if (e.target.id === 'username') return setUsername(e.target.value);
    else if (e.target.id === 'password') return setPassword(e.target.value);
  };

  return (
    <Flex w="100%" align="center" justifyContent="center">
      <Box>
        {user === null ? (
          <Login
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleChange={handleChange}
          />
        ) : (
          <Flex w="full" align="center" justifyContent="center">
            <Box>
              <ToggleDiv label="Create Blog" ref={blogFormRef}>
                <CreateBlog setNotification={setNotification} />
              </ToggleDiv>
              <Card mt={3} w={500} maxWidth={700}>
                <CardHeader>
                  <Heading mt={2} align="center">
                    Blogs
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing={3}>
                    {blogs
                      ?.sort((a, b) => b.likes - a.likes)
                      .map((blog) => (
                        <Box key={blog.id}>
                          <Link
                            to={`/blogs/${blog.id}`}
                            as={RouteLink}
                            color="#2831d4aa"
                          >
                            {blog.title}
                          </Link>
                        </Box>
                      ))}
                  </Stack>
                </CardBody>
              </Card>
            </Box>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};
