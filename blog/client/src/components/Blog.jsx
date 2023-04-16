import PropTypes from 'prop-types';
import { useUserValue } from '../context/UserContext';
import { CreateComment } from './CreateComment';
import { Comments } from './Comments';
import { useQueryClient, useMutation } from 'react-query';
import { createComment } from '../services/blogs';
import {
  Flex,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Box,
  Text,
  Heading,
  StackDivider,
  Button,
} from '@chakra-ui/react';
export const Blog = ({ blog, handleDelete, handleLike }) => {
  const user = useUserValue();

  const queryClient = useQueryClient();
  const commentMutation = useMutation(createComment, {
    onSuccess: (newComment) => {
      const comments = queryClient.getQueryData(['comments']);
      queryClient.setQueryData(['comments'], comments.concat(newComment));
    },
  });

  const handleSubmit = (e, comment) => {
    e.preventDefault();
    commentMutation.mutate({ id: blog.id, comment: comment });
    e.target.comment.value = '';
  };

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Card mb={3} w="full" maxWidth={500}>
        <CardHeader>
          <Heading size="md">{blog.title}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing={2}>
            <Box>
              <Heading size="xs">URL</Heading>
              <Text>{blog.url}</Text>
            </Box>
            <Box>
              <Heading size="xs">LIKES</Heading>
              <Text>{blog.likes}</Text>
              <Button w="100%" onClick={() => handleLike(blog)}>
                like
              </Button>
            </Box>
            <Box>
              <Heading size="xs">AUTHOR</Heading>
              <Text>{blog.author}</Text>
            </Box>
            <Box>
              <Heading size="xs">ADDED BY</Heading>
              <Text>{blog.user.username}</Text>
            </Box>
            {user?.username === blog.user.username ? (
              <Button onClick={() => handleDelete(blog)}>Delete</Button>
            ) : null}
          </Stack>
        </CardBody>
      </Card>

      <CreateComment handleSubmit={handleSubmit} />
      <Comments blog={blog} />
    </Flex>
  );
};

Blog.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
};
