import { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../context/UserContext';
import { useNotifDispatch } from '../context/NotificationContext';
import { useQuery } from 'react-query';
import { getAll, setToken } from '../services/blogs';
import { login } from '../services/auth';
import { Notification } from '../components/Notification';
import { Login } from '../components/Login';
import ToggleDiv from '../components/ToggleDiv';
import { CreateBlog } from '../components/CreateBlog';
import { Blog } from '../components/Blog';

export const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, userDispatch] = useContext(UserContext);
  const notifDispatch = useNotifDispatch();
  const blogFormRef = useRef();
  const results = useQuery(['blogs'], getAll);
  const blogs = results.data;

  // useEffect(() => {
  //   const blogUser = window.localStorage.getItem('blogUser');
  //   if (blogUser) {
  //     const userObj = JSON.parse(blogUser);
  //     userDispatch({ type: 'SET', payload: userObj });
  //     setToken(userObj.token);
  //   }
  // }, []);

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
        setNotification({ notif: 'Logged In!', notifType: 'success' });
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
          <ToggleDiv label="Create Blog" ref={blogFormRef}>
            <CreateBlog setNotification={setNotification} />
          </ToggleDiv>
          <h2>blogs</h2>
          <div className="blog-wrap">
            {blogs
              ?.sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  setNotification={setNotification}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
