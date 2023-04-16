import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { createBlog } from '../services/blogs';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
export const CreateBlog = ({ setNotification }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const queryClient = useQueryClient();
  const createBlogMutation = useMutation(createBlog, {
    refetchOnWindowFocus: false,
    onSuccess: (newBlog) => {
      const allBlogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], allBlogs.concat(newBlog));
    },
    onError: (err) => {
      setNotification({
        notif: err.response.data.error,
        notifType: 'error',
      });
    },
  });

  const handleBlogFormChange = (e) => {
    if (e.target.id === 'title') return setTitle(e.target.value);
    else if (e.target.id === 'author') return setAuthor(e.target.value);
    else if (e.target.id === 'url') return setUrl(e.target.value);
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    createBlogMutation.mutate(newBlog);
    setNotification({
      notif: `Created new blog with title: ${newBlog.title}`,
      notifType: 'success',
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box py={2}>
        <Box textAlign="center" mb={2}>
          <Heading>Add an entry</Heading>
        </Box>
        <form onSubmit={handleBlogSubmit}>
          <FormControl mb={4}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              onChange={handleBlogFormChange}
              id="title"
              type="text"
              value={title}
              placeholder="Harry Potter"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="author">Author</FormLabel>
            <Input
              onChange={handleBlogFormChange}
              id="author"
              type="text"
              value={author}
              placeholder="JK Rowling"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="url">Url</FormLabel>
            <Input
              onChange={handleBlogFormChange}
              id="url"
              type="text"
              value={url}
              placeholder="hogwar.ts"
            />
          </FormControl>
          <Button mb={2} w="full" type="submit" colorScheme="green">
            Submit
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

CreateBlog.propTypes = {
  //handleCreateBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};
