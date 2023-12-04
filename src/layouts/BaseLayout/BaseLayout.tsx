import { Outlet } from "react-router";
import SideBar from "./components/SideBar/SideBar";
import styles from "./components/SideBar/SideBar.module.scss";

export default function BaseLayout() {
  return (
    <>
      <SideBar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
