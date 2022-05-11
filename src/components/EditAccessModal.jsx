import axios from "axios";
import { useEffect, useState } from "react";

export default function EditAccessModal({ closeModal, sheetid }) {
  const [data, setData] = useState();

  useEffect(() => {
    updateData();
  }, []);

  function updateData() {
    axios.get(`/sheet/${sheetid}/users`).then((res) => setData(res.data));
  }
  function onGiveAccess(e) {
    axios
      .put(`/sheet/${sheetid}/users?username=${e.target.id}`)
      .then(updateData);
  }
  function onRemoveAccess(e) {
    axios
      .delete(`/sheet/${sheetid}/users?username=${e.target.id}`)
      .then(updateData);
  }

  return (
    <div className="position-absolute fixed-top w-100 h-100 d-flex flex-column  align-items-center overflow-hidden">
      <div
        id="container"
        className=" w-50 h-100 d-flex flex-column justify-content-center align-items-center pb-5 "
      >
        <div className="d-flex w-75 h-75 flex-column justify-content-baseline  border bg-white">
          <div id="exit" className="d-flex w-100 justify-content-end">
            <button className="btn btn-danger" onClick={closeModal}>
              {" "}
              X{" "}
            </button>
          </div>
          <div
            id="usertables"
            className="d-flex justify-content-between  overflow-hidden"
          >
            <div id="leftTable" className="w-50  p-3 text-center">
              <h6 className="pb-2">Users without access</h6>
              <ul className="list-group overflow-auto h-75">
                {data &&
                  data.notPermitted.map((user) => {
                    return (
                      <li
                        key={user}
                        className="list-group-item d-flex align-items-center justify-content-between"
                      >
                        {user}
                        <button
                          id={user}
                          className="btn btn-sm btn-success"
                          onClick={(e) => onGiveAccess(e)}
                        >
                          {">"}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div id="rightTable" className="w-50 p-3 text-center ">
              <h6 className="pb-2">Users with access</h6>
              <ul className="list-group overflow-auto h-75">
                {data &&
                  data.permitted.map((user) => {
                    return (
                      <li
                        key={user}
                        className="list-group-item d-flex align-items-center justify-content-between"
                      >
                        <button
                          id={user}
                          className="btn btn-sm btn-danger"
                          onClick={(e) => onRemoveAccess(e)}
                        >
                          {"<"}
                        </button>
                        {user}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
