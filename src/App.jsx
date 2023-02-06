import { useState, useEffect } from 'react';
import { Blog } from './components/Blog';
import { getAll, setToken, createBlog } from './services/blogs';
import { login } from './services/auth';
import './App.css';
import { Login } from './components/Login';
import { Notification } from './components/Notification';
import { CreateBlog } from './components/CreateBlog';
function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notifMessage, setNotifMessage] = useState({ text: null, type: '' });

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem('blogUser', JSON.stringify(user));
      setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      showMessage({ text: 'Logged In!', type: 'success' });
    } catch (err) {
      showMessage({ text: err.response.data.error, type: 'error' });
    }
  };

  const handleChange = (e) => {
    if (e.target.id === 'username') return setUsername(e.target.value);
    else if (e.target.id === 'password') return setPassword(e.target.value);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('blogUser');
    setUser(null);
    showMessage({ text: 'Logged Out!', type: 'success' });
    return;
  };

  const handleCreateBlog = async (title, author, url) => {
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      const response = await createBlog(newBlog);
      setBlogs(blogs.concat(response));
      showMessage({
        text: `Created new blog with title: ${newBlog.title}`,
        type: 'success',
      });
    } catch (err) {
      showMessage({ text: err.response.data.error, type: 'error' });
    }
  };

  const showMessage = (message) => {
    setNotifMessage(message);
    setTimeout(() => setNotifMessage({ text: null, type: '' }), 3000);
  };

  return (
    <div className="home">
      <Notification message={notifMessage} />
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
          <CreateBlog handleCreateBlog={handleCreateBlog} />
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
