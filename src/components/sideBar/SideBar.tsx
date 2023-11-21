import React from 'react'
import { Link } from 'react-router-dom'

type SideBarItemType = {
    item: {
        name: string,
        url: string
    }
}

const SideBarItem = ({item}: SideBarItemType) => {
    return (
        <li><Link to={item.url}>{item.name}</Link></li>
    )
}

export default function SideBar() {
  return (
    <div>SideBar</div>
  )
}
