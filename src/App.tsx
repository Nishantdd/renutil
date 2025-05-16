import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/ui/theme-toggle";

export default function App() {
  return <>
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button onClick={() => console.log("Clicked me!")}>Click me</Button>
    </div>
    <ModeToggle />
  </>
}