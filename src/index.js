import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      axios.defaults.headers.common["Authorization"] = null;
      localStorage.removeItem("token");
      window.location.assign("/login");
    } else if (error.response.status === 403) {
      window.location.assign("/");
    }
  }
);
