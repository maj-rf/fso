import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Flex,
  Box,
} from '@chakra-ui/react';

export const User = ({ user }) => {
  if (!user) return null;
  console.log(user);
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Card mb={3} w="full" maxWidth={500}>
        <CardHeader>
          <Heading>{user.name}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing={2}>
            <Heading size="xs">Added Blogs</Heading>
            {user.blogs.map((blog) => {
              return <Box key={blog.id}>{blog.title}</Box>;
            })}
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
};
