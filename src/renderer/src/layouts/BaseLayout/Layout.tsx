import React from 'react';
import SideBar from '@/components/sidebar/SideBar';
import { Outlet } from 'react-router-dom';

export default function Layouts() {
  return (
    <div>
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
