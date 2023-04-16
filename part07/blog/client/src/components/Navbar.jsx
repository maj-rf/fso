import { Route, Link as RouteLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNotifDispatch } from '../context/NotificationContext';
import { Button, Flex, HStack, Link } from '@chakra-ui/react';
export const Navbar = () => {
  const [user, userDispatch] = useContext(UserContext);
  const notifDispatch = useNotifDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem('blogUser');
    userDispatch({ type: 'RESET' });
    notifDispatch({
      type: 'show',
      payload: { notif: 'Logged OUT!', notifType: 'success' },
    });
    setTimeout(() => notifDispatch({ type: 'hide' }), 3000);
    navigate('/');
    return;
  };
  return (
    <Flex
      w="100%"
      maxWidth={500}
      margin="0 auto"
      border="1px solid purple"
      borderRadius="0.5rem"
      my={2}
      px="2"
      py="1"
      align="center"
      justify="space-between"
      backgroundColor="gray.200"
    >
      <HStack>
        <Link to="/" as={RouteLink} color="#0a16e8d8">
          Blogs
        </Link>
        <Link to="/users" as={RouteLink} color="#0a16e8d8">
          Users
        </Link>
      </HStack>

      <HStack className="log-info">
        <p>hello, {user?.username}</p>
        <Button onClick={handleLogout} colorScheme="red">
          Logout
        </Button>
      </HStack>
    </Flex>
  );
};
