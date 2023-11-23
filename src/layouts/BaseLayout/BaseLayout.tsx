import { Outlet } from 'react-router'

export default function BaseLayout() {
  return (
    <>
      <header>

      </header>

      <main>
          <Outlet />
      </main>
    </>
  )
}
