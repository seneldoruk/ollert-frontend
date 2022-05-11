import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarPart from "../components/NavbarPart";
import SheetPart from "../components/SheetPart";
const axios = require("axios").default;

export default function Sheet() {
  const { sheetid } = useParams();
  const [data, setData] = useState();
  const [isEditMode, setEditMode] = useState(false);
  useEffect(() => {
    updateData();
    var t = setInterval(updateData, 10000);
  }, []);

  return (
    <div>
      <NavbarPart
        newColumn={newSheetPart}
        editColumns={toggleEditMode}
        isEditMode={isEditMode}
        tableName={data ? data.name : ""}
        changeSheetName={changeSheetName}
      />
      <div className="d-flex flex-row justify-content-around">
        {data &&
          data.parts.map((part) => {
            return (
              <SheetPart
                part={part}
                partsummary={data.partsummary}
                sheetid={sheetid}
                updateData={updateData}
                key={part.id}
                isEditMode={isEditMode}
              />
            );
          })}
      </div>
      <div className="text-center">Tasks can be deleted with double click</div>
    </div>
  );

  function updateData() {
    axios
      .get(`/sheet/${sheetid}`)
      .then((res) => {
        res.data.parts = res.data.parts.sort(function (a, b) {
          return a.index - b.index;
        });
        res.data.partsummary = [];
        res.data.parts.forEach((part) => {
          res.data.partsummary.push({
            id: part.id,
            index: part.index,
            name: part.name,
          });
        });
        console.log("a");
        setData(res.data);
      })
      .catch((error) => {
        window.location.href = "/";
      });
  }

  function newSheetPart() {
    axios.post(`/sheet/${sheetid}`).then(() => updateData());
  }

  function toggleEditMode() {
    setEditMode(!isEditMode);
  }

  function changeSheetName(e) {
    e.preventDefault();
    console.log(e.target[0].value);
    axios.put(`/sheet/${sheetid}?name=${e.target[0].value}`).then(() => {
      updateData();
    });
  }
}
