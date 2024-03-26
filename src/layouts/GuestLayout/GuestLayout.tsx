import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div className="w-full h-[100vh]">
      <Outlet />
    </div>
  );
}
