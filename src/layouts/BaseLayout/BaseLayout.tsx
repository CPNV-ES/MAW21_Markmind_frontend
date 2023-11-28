import { Outlet } from "react-router";
import SideBar from "./components/SideBar/SideBar";
import styles from "./components/SideBar/SideBar.module.css";

export default function BaseLayout() {
  return (
    <>
      <main>
        <div className={styles.sidebar}>
          <SideBar />
        </div>
        <Outlet />
      </main>
    </>
  );
}
