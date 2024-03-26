import { Outlet } from "react-router-dom";
import GlobalAlert from "./GlobalAlert";
import GlobalModal from "./GlobalModal";
import Sidebar from "./Sidebar/Sidebar";

export default function BaseLayout() {
  return (
    <div className="w-full h-[100vh] grid grid-cols-[250px_1fr]">
      <GlobalAlert />
      <GlobalModal />
      <Sidebar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
