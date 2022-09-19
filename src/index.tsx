import "./tailwind.css";
import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => <div>App</div>;

root.render(<App />);