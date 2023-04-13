import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateBlog } from './CreateBlog';

describe('Blog Form', () => {
  test('create a new blog', async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();
    render(<CreateBlog handleCreateBlog={createBlog} />);
    const title = screen.getByPlaceholderText('Harry Potter');
    const author = screen.getByPlaceholderText('JK Rowling');
    const url = screen.getByPlaceholderText('hogwar.ts');
    const sendButton = screen.getByText('Submit');
    await user.type(title, 'El Filibusterismo');
    expect(title).toHaveValue('El Filibusterismo');
    await user.type(author, 'Dr. Jose Rizal');
    expect(author).toHaveValue('Dr. Jose Rizal');
    await user.type(url, 'randomurl.com');
    expect(url).toHaveValue('randomurl.com');
    await user.click(sendButton);
    expect(createBlog.mock.calls).toHaveLength(1);
  });
});
