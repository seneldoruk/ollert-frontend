const axios = require("axios").default;
export default function NavbarAll({ updateData }) {
  function logout() {
    localStorage.removeItem("token");
    window.location.assign("/login");
  }
  return (
    <nav className="navbar navbar-light bg-light">
      <div>
        <span className="navbar-brand m-1 btn btn-light">Ollert</span>
      </div>

      <div>
        <form onSubmit={newSheet}>
          <div className="d-flex flex-row justify-contents-center col-xs-1">
            <input
              type="text"
              placeholder="Column Name"
              className="form-control form-control-sm m-1 "
            ></input>
            <button
              className="btn btn-primary m-1 text-nowrap"
              onClick={newSheet}
            >
              New Column
            </button>
          </div>
        </form>
      </div>

      <div>
        <button className="btn btn-secondary m-1" onClick={() => logout()}>
          Log Out
        </button>
      </div>
    </nav>
  );
  function newSheet(e) {
    e.preventDefault();
    axios.post(`/sheet/all?name=${e.target.form[0].value}`).then(() => {
      updateData();
    });
  }
}
