import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import ErrorElement from './pages/ErrorElement';
import Home from './pages/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import EditJob from './pages/editJob';
import Job from './pages/job/index.element';
import AddJob from './pages/postJob';
import jobLoader from './pages/job/index.loader';
import AuthLayout from './pages/auth/AuthLayout';
import authLoader from './pages/auth/loader';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
      {
        path: 'jobs',
        children: [
          { path: 'post', element: <AddJob />, loader: authLoader },
          {
            path: ':id',
            loader: jobLoader,
            id: 'job',
            shouldRevalidate: () => true,
            children: [
              { index: true, element: <Job /> },
              { path: 'edit', element: <EditJob />, loader: authLoader },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
