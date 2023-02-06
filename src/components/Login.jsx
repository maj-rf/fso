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
