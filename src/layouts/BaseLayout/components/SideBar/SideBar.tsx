import Workspace from "./components/Workspace";
import data from "../../../../data/workspace";
import Collections from "./components/Collections";
import Styles from "./SideBar.module.scss"


export default function SideBar() {
  console.log(Styles)
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
