import Workspace from "./components/Workspace";
import data from "../../../../data/workspace";
import Collections from "./components/Collections";

export default function SideBar() {
  return (
    <>
      <header>
        <Workspace workspace={data.name} />
      </header>
      <div>
        <Collections collections={data.collections} />
      </div>
    </>
  );
}
