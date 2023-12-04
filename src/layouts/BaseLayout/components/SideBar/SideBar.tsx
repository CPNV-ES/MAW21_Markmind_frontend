import Workspace from "./components/Workspace";
import data from "../../../../data/workspace";
import Collections from "./components/Collections";
import Style from "./SideBar.module.scss";


export default function SideBar() {
  return (
    <div className={Style.sideBar}>
      <header>
        <Workspace workspace={data.name} />
      </header>
      <div>
        <Collections collections={data.collections} />
      </div>
    </div>
  );
}
