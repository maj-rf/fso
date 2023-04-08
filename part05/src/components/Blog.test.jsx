import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Blog } from './Blog';

let blog;
let mockUser;
let mockDelete;
let mockLiker;

beforeEach(() => {
  blog = {
    id: '1',
    title: 'Noli Me Tangere',
    author: 'Dr. Jose Rizal',
    url: 'http://localhost:3000/',
    likes: 0,
    user: {
      username: 'red',
    },
  };

  mockUser = {
    name: 'red',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZCIsImlkIjoiNjNkYTFmMjg3NGIwY2I1MzE3NGNlNzY1IiwiaWF0IjoxNjc2MjUwMjI0LCJleHAiOjE2NzYyNTM4MjR9.huzuymyjyxI318lu17C8tfVEfmYcK-LPvmva6aereFY',
    username: 'red',
  };

  mockDelete = jest.fn();
  mockLiker = jest.fn();
});

describe('Blog Page', () => {
  test('renders Blog title and author', () => {
    render(
      <Blog
        blog={blog}
        user={mockUser}
        handleBlogLikes={mockLiker}
        handleDeleteBlog={mockDelete}
      />
    );
    const title = screen.getByText('Noli Me Tangere');
    const author = screen.getByText('Dr. Jose Rizal');
    expect(title && author).toBeDefined();
  });

  test('clicking view shows blog url and likes', async () => {
    render(
      <Blog
        blog={blog}
        user={mockUser}
        handleBlogLikes={mockLiker}
        handleDeleteBlog={mockDelete}
      />
    );
    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);
    const url = screen.getByText('http://localhost:3000/');
    const likes = screen.getByText('0');
    expect(url && likes).toBeDefined();
  });

  test('clicking like button twice will update prop twice', async () => {
    render(
      <Blog
        blog={blog}
        user={mockUser}
        handleBlogLikes={mockLiker}
        handleDeleteBlog={mockDelete}
      />
    );
    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);
    const like = screen.getByText('like');
    await user.click(like);
    await user.click(like);
    expect(mockLiker).toBeCalledTimes(2);
  });
});
