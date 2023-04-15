import { useState, useContext, useRef } from 'react';
import { UserContext } from '../context/UserContext';
import { useNotifDispatch } from '../context/NotificationContext';
import { useQuery } from 'react-query';
import { getAll, setToken } from '../services/blogs';
import { login } from '../services/auth';
import { Login } from '../components/Login';
import ToggleDiv from '../components/ToggleDiv';
import { CreateBlog } from '../components/CreateBlog';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, userDispatch] = useContext(UserContext);
  const notifDispatch = useNotifDispatch();
  const blogFormRef = useRef();
  const results = useQuery(['blogs'], getAll);
  const blogs = results.data;

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
      if (user) {
        userDispatch({ type: 'SET', payload: user });
        setToken(user.token);
        setUsername('');
        setPassword('');
        setNotification({
          notif: 'Logged In!',
          notifType: 'success',
        });
      }
    } catch (err) {
      setNotification({ notif: err.response.data.error, notifType: 'error' });
    }
  };

  const handleChange = (e) => {
    if (e.target.id === 'username') return setUsername(e.target.value);
    else if (e.target.id === 'password') return setPassword(e.target.value);
  };

  return (
    <div className="home">
      {user === null ? (
        <Login
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleChange={handleChange}
        />
      ) : (
        <div>
          <ToggleDiv label="Create Blog" ref={blogFormRef}>
            <CreateBlog setNotification={setNotification} />
          </ToggleDiv>
          <h2>blogs</h2>
          <div className="blog-wrap">
            {blogs
              ?.sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <div key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
