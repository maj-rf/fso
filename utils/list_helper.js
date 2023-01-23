const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, current) => {
    return sum + current.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (acc, current) => {
    return acc.likes > current.likes ? acc : current;
  };
  return blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0]);
};

const getMaxofMap = (blogs, type) => {
  const artistMap = new Map();
  for (const blog of blogs) {
    const author = blog.author;
    const value = type === 'likes' ? blog.likes : 1;
    if (artistMap.has(author))
      artistMap.set(author, artistMap.get(author) + value);
    else artistMap.set(author, value);
  }
  // get the largest count using reduce. convert map to array
  const max = [...artistMap.entries()].reduce((acc, curr) => {
    return curr[1] > acc[1] ? curr : acc;
  });
  return max;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const max = getMaxofMap(blogs, 'blogs');
  return { author: max[0], blogs: max[1] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const max = getMaxofMap(blogs, 'likes');
  return { author: max[0], likes: max[1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
