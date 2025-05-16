import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
