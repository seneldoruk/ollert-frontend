import "./App.css";
import Sheet from "./pages/Sheet";
import { Route, Routes } from "react-router-dom";
import AllSheets from "./pages/AllSheets";
import Login from "./pages/Login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AllSheets />} />
        <Route path="/sheet/:sheetid" element={<Sheet />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
