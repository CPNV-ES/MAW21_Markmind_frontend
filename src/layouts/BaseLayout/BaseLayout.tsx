import { Outlet } from "react-router";
import SideBar from "./components/SideBar/SideBar";

export default function BaseLayout() {
  return (
    <>
      <main>
        <SideBar />
        <Outlet />
      </main>
    </>
  );
}
