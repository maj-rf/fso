import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNotifDispatch } from '../context/NotificationContext';
export const Navbar = () => {
  const [user, userDispatch] = useContext(UserContext);
  const notifDispatch = useNotifDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem('blogUser');
    userDispatch({ type: 'RESET' });
    notifDispatch({
      type: 'show',
      payload: { notif: 'Logged OUT!', notifType: 'success' },
    });
    setTimeout(() => notifDispatch({ type: 'hide' }), 3000);
    navigate('/');
    return;
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Blogs</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <div className="log-info">
        <p>hello, {user?.username}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};
