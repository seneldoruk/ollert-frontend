export default function RegisterForm() {
  return (
    <div className="text-center">
      <h4>Register</h4>
      <form>
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

        <div className="form-outline mb-4">
          <input type="password" id="password" className="form-control" />
          <label className="form-label" htmlFor="form2Example2">
            Retype password
          </label>
        </div>

        <button type="button" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>
      </form>
    </div>
  );
}
