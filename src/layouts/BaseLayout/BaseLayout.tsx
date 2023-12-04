import { Outlet } from "react-router";
import SideBar from "./components/SideBar/SideBar";
import Styles from "./baseLayout.module.scss"

export default function BaseLayout() {
  return (
    <div className={Styles.container}>
      <SideBar />
      <main className={Styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
