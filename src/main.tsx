// نقطة دخول React: تنشئ root وتعرض التطبيق داخل عنصر #root الموجود في index.html.
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
