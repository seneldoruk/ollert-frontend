import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarAll from "../components/NavbarAll";
export default function AllSheets() {
  const axios = require("axios").default;
  const [tables, setTables] = useState();
  useEffect(() => {
    updateTables();
  }, []);

  return (
    <div>
      <NavbarAll updateData={updateTables} />
      <div className="m-5 d-flex flex-row flex-wrap">
        {tables &&
          tables.map((table) => {
            return (
              <div
                className="card text-center m-2"
                style={{ width: "18rem" }}
                key={table.id}
              >
                <div className="card-body">
                  <h5 className="card-title">{table.name}</h5>
                  <Link
                    to={`/sheet/${table.id}`}
                    className="btn btn-primary m-1"
                  >
                    Open
                  </Link>
                  <button
                    className="btn btn-danger m-1"
                    value={table.id}
                    onClick={deleteTable}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
  function updateTables() {
    axios.get("/sheet/all").then((res) => {
      setTables(res.data);
    });
  }
  function deleteTable(e) {
    console.log(e.target.value);
    axios.delete(`/sheet/${e.target.value}`).then(() => {
      updateTables();
    });
  }
}
