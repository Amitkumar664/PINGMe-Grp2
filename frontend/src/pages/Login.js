function Login() {
  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input className="form-control my-2" placeholder="Email" />
      <input className="form-control my-2" type="password" placeholder="Password" />
      <button className="btn btn-primary">Login</button>
    </div>
  );
}

export default Login;