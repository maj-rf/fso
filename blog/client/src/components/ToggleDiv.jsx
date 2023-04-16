import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Flex } from '@chakra-ui/react';

const ToggleDiv = forwardRef(function (props, refs) {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box style={hideWhenVisible}>
        <Button w="full" onClick={toggleVisibility} colorScheme="purple">
          {props.label}
        </Button>
      </Box>
      <Box style={showWhenVisible} className="hidden-content">
        {props.children}
        <Button w="full" onClick={toggleVisibility} colorScheme="purple">
          Close
        </Button>
      </Box>
    </Flex>
  );
});

ToggleDiv.displayName = 'ToggleDiv';
ToggleDiv.propTypes = {
  refs: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  props: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
};
export default ToggleDiv;
