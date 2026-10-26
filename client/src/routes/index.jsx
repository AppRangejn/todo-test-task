import { Navigate, useRoutes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TasksPage from '../pages/TasksPage';

function Routes() {
  const { isAuth } = useAuth();

  const routes = useRoutes([
    {
      path: '/',
      element: isAuth ? <TasksPage /> : <Navigate to="/login" replace />,
    },
    {
      path: '/login',
      element: !isAuth ? <LoginPage /> : <Navigate to="/" replace />,
    },
    {
      path: '/register',
      element: !isAuth ? <RegisterPage /> : <Navigate to="/" replace />,
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  return routes;
}

export default Routes;
