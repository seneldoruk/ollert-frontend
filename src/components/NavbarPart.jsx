import { Link } from "react-router-dom";
export default function NavbarPart({
  editColumns,
  newColumn,
  isEditMode,
  tableName,
  changeSheetName,
}) {
  return (
    <nav className="navbar navbar-light bg-light">
      <div>
        <Link to="/" className="navbar-brand m-1 btn btn-light border">
          Ollert Home
        </Link>
      </div>
      <div>
        {!isEditMode ? (
          <h4 className="m-1 ">{tableName}</h4>
        ) : (
          <div>
            <form onSubmit={changeSheetName}>
              <div className="d-flex flex-row">
                <input
                  type="text"
                  className="form-control m-1"
                  defaultValue={tableName}
                />
                <button className="btn btn-success m-1">Save</button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div>
        <button className="btn btn-secondary m-1" onClick={editColumns}>
          {isEditMode ? "Finish Editing" : "Edit Mode"}
        </button>
        <button className="btn btn-primary m-1" onClick={newColumn}>
          New Column
        </button>
      </div>
    </nav>
  );
}
