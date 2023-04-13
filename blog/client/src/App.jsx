import { useState, useEffect, useRef } from 'react';
import { Blog } from './components/Blog';
import {
  getAll,
  setToken,
  createBlog,
  deleteBlog,
  updateBlog,
} from './services/blogs';
import { login } from './services/auth';
import './App.css';
import { Login } from './components/Login';
import { Notification } from './components/Notification';
import { CreateBlog } from './components/CreateBlog';
import ToggleDiv from './components/ToggleDiv';
import { useNotifDispatch } from './context/NotificationContext';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const notifDispatch = useNotifDispatch();
  const blogFormRef = useRef();
  const sorted = blogs.sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const blogUser = window.localStorage.getItem('blogUser');
    if (blogUser) {
      const userObj = JSON.parse(blogUser);
      setUser(userObj);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem('blogUser', JSON.stringify(user));
      setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setNotification({ notif: 'Logged In!', notifType: 'success' });
    } catch (err) {
      setNotification({ notif: err.response.data.error, notifType: 'error' });
    }
  };

  const handleChange = (e) => {
    if (e.target.id === 'username') return setUsername(e.target.value);
    else if (e.target.id === 'password') return setPassword(e.target.value);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('blogUser');
    setUser(null);
    setNotification({ notif: 'Logged Out!', notifType: 'success' });
    return;
  };

  const handleCreateBlog = async (title, author, url) => {
    blogFormRef.current.toggleVisibility();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      const response = await createBlog(newBlog);
      setBlogs(blogs.concat(response));
      setNotification({
        notif: `Created new blog with title: ${newBlog.title}`,
        notifType: 'success',
      });
    } catch (err) {
      setNotification({ notif: err.response.data.error, notifType: 'error' });
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id);
      const newBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs(newBlogs);
      setNotification({
        notif: 'Successfully deleted',
        notifType: 'success',
      });
    } catch (err) {
      setNotification({ notif: err.response.data.error, notifType: 'error' });
    }
  };

  const handleBlogLikes = async (id, newObj) => {
    try {
      await updateBlog(id, newObj);
      const newBlogs = blogs.map((obj) => {
        return obj.id === id ? { ...obj, likes: obj.likes + 1 } : obj;
      });
      setBlogs(newBlogs);
      setNotification({
        notif: 'Succesfully Liked',
        notifType: 'success',
      });
    } catch (err) {
      setNotification({ notif: err.response.data.error, notifType: 'error' });
    }
  };

  return (
    <div className="home">
      <Notification />
      {user === null ? (
        <Login
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleChange={handleChange}
        />
      ) : (
        <div>
          <p>
            hello, {user.username}
            <button onClick={handleLogout}>Logout</button>
          </p>
          <ToggleDiv label="Create Blog" ref={blogFormRef}>
            <CreateBlog handleCreateBlog={handleCreateBlog} />
          </ToggleDiv>
          <h2>blogs</h2>
          <div className="blog-wrap">
            {sorted?.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleDeleteBlog={handleDeleteBlog}
                handleBlogLikes={handleBlogLikes}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
