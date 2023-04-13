import PropTypes from 'prop-types';

export const Login = ({ username, password, handleLogin, handleChange }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          id="username"
          type="text"
          value={username}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          id="password"
          type="password"
          value={password}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
