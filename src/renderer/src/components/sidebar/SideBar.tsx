import React from 'react';
import { Link } from 'react-router-dom';

type SideBarItemProps = {
  item: {
    name: string;
    link: string;
  };
};

function SideBarItem({ item }: SideBarItemProps) {
  return (
    <li>
      <Link to={item.link}>{item.name}</Link>
    </li>
  );
}

export default function SideBar() {
  return (
    <div>
      <ul>
        <SideBarItem item={{ name: 'Home', link: './home' }} />
        <SideBarItem item={{ name: 'Home', link: './home' }} />
      </ul>
    </div>
  );
}
