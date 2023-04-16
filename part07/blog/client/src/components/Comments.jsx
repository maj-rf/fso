import { useQuery } from 'react-query';
import { getComments } from '../services/blogs';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
export const Comments = ({ blog }) => {
  if (!blog) return null;
  const commentsResult = useQuery(['comments'], () => getComments(blog));
  const comments = commentsResult.data;
  if (!comments) return null;
  if (commentsResult.isLoading) return <div>Loading...</div>;
  if (commentsResult.error)
    return <div>An error has occurred: {commentsResult.error.message};</div>;
  if (comments.length === 0) return <div>No comments yet</div>;
  return (
    <Flex
      w="full"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Card w="full" maxWidth={500}>
        <CardHeader>
          <Heading size="md">Comments</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing={2}>
            {comments.map((comment) => (
              <Box key={comment.id}>
                <Text>{comment.content}</Text>
              </Box>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
};
