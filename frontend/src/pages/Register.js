function Register() {
  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <input className="form-control my-2" placeholder="Name" />
      <input className="form-control my-2" placeholder="Email" />
      <input className="form-control my-2" type="password" placeholder="Password" />
      <button className="btn btn-success">Register</button>
    </div>
  );
}

export default Register;