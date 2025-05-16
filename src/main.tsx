import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./components/ui/theme-provider";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
