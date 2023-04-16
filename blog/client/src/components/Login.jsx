import PropTypes from 'prop-types';
import {
  FormControl,
  Flex,
  Box,
  FormLabel,
  Input,
  Heading,
  Button,
} from '@chakra-ui/react';

export const Login = ({ username, password, handleLogin, handleChange }) => {
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleLogin}>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                onChange={handleChange}
                id="username"
                type="text"
                value={username}
                placeholder="my_user_name"
              />
            </FormControl>
            <FormControl mt={6} mb={4}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                onChange={handleChange}
                id="password"
                type="password"
                value={password}
                placeholder="********"
              />
            </FormControl>
            <Button width="full" type="submit" colorScheme="green">
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
