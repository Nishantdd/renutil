import ReactDOM from "react-dom/client";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "./components/ui/theme-provider";
import { ModeToggle } from "./components/ui/theme-toggle";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider>
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button onClick={() => console.log("Clicked me!")}>Click me</Button>
    </div>
    <ModeToggle />
  </ThemeProvider>,
);
