import Workspace from "./components/Workspace";
import data from "../../../../data/workspace";
import Collections from "./components/Collections";
import styles from "./SideBar.module.css";

export default function SideBar() {
  return (
    <>
      <header>
        <h1 className={styles.h1}>Collections</h1>
        <Workspace workspace={data.name} />
      </header>
      <div>
        <Collections collections={data.collections} />
      </div>
    </>
  );
}
