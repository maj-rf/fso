import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleDiv from './ToggleDiv';

describe('Toggleable Div', () => {
  let container;

  beforeEach(() => {
    container = render(
      <ToggleDiv label="View">
        <div className="testDiv">togglable content</div>
      </ToggleDiv>,
    ).container;
  });

  test('renders its children', async () => {
    await screen.findAllByText('togglable content');
  });

  test('at start, the children are not displayed', () => {
    const div = container.querySelector('.hidden-content');
    expect(div).toHaveStyle('display: none');
  });

  test('children are displayed if view button is clicked', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);

    const div = container.querySelector('.hidden-content');
    expect(div).not.toHaveStyle('display: none');
  });

  test('children are hidden if close button is clicked', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);

    const closeButton = screen.getByText('Close');
    await user.click(closeButton);

    const div = container.querySelector('.hidden-content');
    expect(div).toHaveStyle('display: none');
  });
});
