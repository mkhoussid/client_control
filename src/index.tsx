import React from "react";
import ReactDOM from "react-dom/client";
import ClientControl from "./ClientControl";

import "./DataGrid/datagrid.css";
import "./Modal/modal.css";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(<ClientControl />);
