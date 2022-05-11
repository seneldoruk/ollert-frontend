import { useState } from "react";

const axios = require("axios").default;

export default function EditSheetPart({ partName, partID, updateData }) {
  const [name, setName] = useState(partName);
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        defaultValue={partName}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <div className="input-group-append">
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={saveSheetPart}
        >
          Save
        </button>
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={deleteSheetPart}
        >
          Delete
        </button>
      </div>
    </div>
  );

  function saveSheetPart(e) {
    axios.put(`/sheetparts/${partID}?name=${name}`).then(() => updateData());
  }

  function deleteSheetPart() {
    axios.delete(`/sheetparts/${partID}`).then(() => {
      updateData();
    });
  }
}
