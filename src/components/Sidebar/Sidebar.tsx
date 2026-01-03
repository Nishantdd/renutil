import ActionCards from "./ActionCards";
import { ActionCommandMenu } from "./ActionCommandsMenu";

export default function Sidebar() {
  return (
    <>
      <ActionCommandMenu />
      <ActionCards />
    </>
  );
}
