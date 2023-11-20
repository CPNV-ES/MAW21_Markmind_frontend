import Layouts from '@/layouts/BaseLayout/Layout';
import Home from '@/pages/Home/Home';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
    children: [
      { path: '/index.html', element: <Home /> },
      { path: '*', element: '404' },
    ],
  },
]);

export default router;
