import axios from "axios";
import { useState } from "react";
export default function LoginForm() {
  const [loginError, setLoginError] = useState(false);
  function login(e) {
    e.preventDefault();
    let username = e.target[0].value;
    let password = e.target[1].value;
    axios
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer: " + res.data.trim();
        localStorage.setItem("token", res.data.trim());
        window.location.assign("/");
      })
      .catch(() => {
        e.target[1].value = "";
        setLoginError(true);
      });
  }

  return (
    <div className="text-center">
      <h4>Login</h4>
      <form onSubmit={(e) => login(e)}>
        <div className="form-outline mb-4">
          <input type="text" id="username" className="form-control" />
          <label className="form-label" htmlFor="form2Example1">
            Username
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="password"
            className="form-control"
            onChange={() => setLoginError(false)}
          />
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>
        {loginError && (
          <div className="alert alert-danger" role="alert">
            Failed, try again
          </div>
        )}
      </form>
    </div>
  );
}
