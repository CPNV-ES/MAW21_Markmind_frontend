import Workspace from "./components/Workspace";
import data from "../../../../data/workspace";
import Collections from "./components/Collections";
import Styles from "./sideBar.module.scss";


export default function SideBar() {
  return (
    <div className={Styles.sidebar}>
      <header>
        <Workspace workspace={data.name} />
      </header>
      <div>
        <Collections collections={data.collections} />
      </div>
    </div>
  );
}
