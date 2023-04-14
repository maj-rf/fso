import './App.css';
import { Routes, Route, useMatch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Users } from './pages/Users';
import { User } from './pages/User';
import { Navbar } from './components/Navbar';
import { UserContext } from './context/UserContext';
import { useContext, useEffect } from 'react';
import { setToken } from './services/blogs';
import { useQuery } from 'react-query';
import { getUsers } from './services/users';

function App() {
  const [user, userDispatch] = useContext(UserContext);
  const result = useQuery(['users'], getUsers);
  const match = useMatch('/users/:id');
  //console.log(result.data);
  useEffect(() => {
    const blogUser = window.localStorage.getItem('blogUser');
    if (blogUser) {
      const userObj = JSON.parse(blogUser);
      userDispatch({ type: 'SET', payload: userObj });
      setToken(userObj.token);
    }
  }, []);

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="/users/:id"
          element={
            <User user={result?.data?.find((a) => a.id === match?.params.id)} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
