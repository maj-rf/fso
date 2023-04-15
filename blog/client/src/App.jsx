import './App.css';
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Users } from './pages/Users';
import { User } from './pages/User';
import { Navbar } from './components/Navbar';
import { UserContext } from './context/UserContext';
import { useContext, useEffect } from 'react';
import { getAll, setToken, deleteBlog, updateBlog } from './services/blogs';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getUsers } from './services/users';
import { Blog } from './components/Blog';
import { Notification } from './components/Notification';
import { useNotifDispatch } from './context/NotificationContext';
function App() {
  const [user, userDispatch] = useContext(UserContext);
  const usersResult = useQuery(['users'], getUsers);
  const blogResult = useQuery(['blogs'], getAll);
  const userMatch = useMatch('/users/:id');
  const blogMatch = useMatch('/blogs/:id');
  const currentUser = userMatch
    ? usersResult?.data?.find((user) => user.id === userMatch.params.id)
    : null;
  const currentBlog = blogMatch
    ? blogResult?.data?.find((a) => a.id === blogMatch?.params.id)
    : null;

  const notifDispatch = useNotifDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const blogUser = window.localStorage.getItem('blogUser');
    if (blogUser) {
      const userObj = JSON.parse(blogUser);
      userDispatch({ type: 'SET', payload: userObj });
      setToken(userObj.token);
    }
  }, []);

  const setNotification = (payload) => {
    notifDispatch({
      type: 'show',
      payload,
    });
    setTimeout(() => notifDispatch({ type: 'hide' }), 3000);
  };

  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => queryClient.invalidateQueries(['blogs']),
  });

  const updateBlogMutation = useMutation(updateBlog, {
    onSuccess: () => queryClient.invalidateQueries(['blogs']),
  });

  const handleDelete = (blog) => {
    if (confirm(`Do you want to delete ${blog.title}?`)) {
      deleteBlogMutation.mutate(blog.id);
      setNotification({
        notif: 'Successfully deleted',
        notifType: 'success',
      });
      navigate('/');
    }
  };

  const handleLike = (blog) => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
    setNotification({
      notif: `You liked ${blog.title} by ${blog.author}`,
      notifType: 'success',
    });
  };

  if (blogResult.isLoading) return <div>Loading blogs...</div>;
  if (blogResult.isError) return <div>Error: {blogResult.error}</div>;
  return (
    <>
      {user && <Navbar />}
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={currentUser} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              handleDelete={handleDelete}
              handleLike={handleLike}
              blog={currentBlog}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
