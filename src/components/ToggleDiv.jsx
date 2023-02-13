import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

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
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.label}</button>
      </div>
      <div style={showWhenVisible} className="hidden-content">
        {props.children}
        <button onClick={toggleVisibility}>Close</button>
      </div>
    </div>
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
