import { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Flex } from '@chakra-ui/react';
export const CreateComment = ({ handleSubmit }) => {
  const [comment, setComment] = useState('');
  return (
    <form onSubmit={(e) => handleSubmit(e, comment)}>
      <Flex gap={2}>
        <FormControl mb={2}>
          <FormLabel htmlFor="comment" hidden>
            Comment
          </FormLabel>
          <Input
            onChange={(e) => setComment(e.target.value)}
            id="comment"
            type="text"
            value={comment}
            placeholder="This is good..."
          />
        </FormControl>
        <Button w="full" type="submit" colorScheme="green">
          Add Comment
        </Button>
      </Flex>
    </form>
  );
};
