import EditSheetPart from "./EditSheetPart";

const axios = require("axios").default;

export default function SheetPart({
  part,
  partsummary,
  sheetid,
  updateData,
  isEditMode,
}) {
  return (
    <div className="m-4">
      {!isEditMode && (
        <div>
          <h5 style={{ textAlign: "center" }}>{part.name}</h5>
          <form className="d-flex align-items-center m-1" onSubmit={addTask}>
            <input type="text" className="form-control m-1" />
            <button className="btn btn-success "> Add </button>
          </form>
        </div>
      )}
      {isEditMode && (
        <EditSheetPart
          partName={part.name}
          partID={part.id}
          updateData={updateData}
        />
      )}

      <div className="list-group">
        {part.tasks.map((task, index) => {
          return (
            <div
              className="list-group-item list-group-item-action d-flex flex-row justify-content-between align-items-center"
              key={index}
            >
              <button
                value={part.index - 1}
                className="btn btn-primary btn-sm"
                onClick={changeTaskPosition}
                disabled={isEditMode}
              >
                {"<"}
              </button>
              <span className="m-2" value={task} onDoubleClick={deleteTask}>
                {task}
              </span>
              <button
                value={part.index + 1}
                className="btn btn-primary btn-sm"
                onClick={changeTaskPosition}
                disabled={isEditMode}
              >
                {">"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  function changeTaskPosition(e) {
    let taskindex = e.target.parentNode.getAttribute("value");
    let nextPartIndex = e.target.value;
    if (nextPartIndex >= partsummary.length || nextPartIndex < 0) {
      return;
    }
    let nextPartID;
    partsummary.map((part) => {
      if (part.index == nextPartIndex) {
        nextPartID = part.id;
      }
    });
    axios
      .put(`/sheet/${sheetid}/task`, {
        fromPartID: part.id,
        taskCurrentIndex: taskindex,
        toPartID: nextPartID,
        taskNextIndex: 0,
      })
      .then(() => {
        updateData();
      });
  }

  function deleteTask(e) {
    axios
      .delete(`/sheetparts/${part.id}/task?task=${e.currentTarget.innerText}`)
      .then(() => updateData());
  }
  function addTask(e) {
    e.preventDefault();
    axios
      .post(`/sheetparts/${part.id}/task?task=${e.target[0].value}`)
      .then(() => updateData());
  }
}
