import { Outlet } from "react-router";
import SideBar from "./components/SideBar/SideBar";

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
