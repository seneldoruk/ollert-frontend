import { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  function register(e) {
    e.preventDefault();
    let username = e.target[0].value;
    let password = e.target[1].value;
    axios
      .post("/auth/register", {
        username: username,
        password: password,
      })
      .then((res) => {
        setError(false);
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        setError(true);
      });
    e.target[0].value = "";
    e.target[1].value = "";
  }
  return (
    <div className="text-center">
      <h4>Register</h4>
      <form onSubmit={(e) => register(e)}>
        <div className="form-outline mb-4">
          <input type="text" id="username" className="form-control" />
          <label className="form-label" htmlFor="form2Example1">
            Username
          </label>
        </div>

        <div className="form-outline mb-4">
          <input type="password" id="password" className="form-control" />
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Register
        </button>
        {error && (
          <div className="alert alert-danger" role="alert">
            User already exists
          </div>
        )}
        {success && (
          <div className="alert alert-success" role="alert">
            User is created
          </div>
        )}
      </form>
    </div>
  );
}
