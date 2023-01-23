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

module.exports = {
  dummy,
  totalLikes,
};
