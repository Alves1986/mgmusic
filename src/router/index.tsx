import { createBrowserRouter } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/admin/Login'
import Dashboard from '@/pages/admin/Dashboard'
import PortfolioAdmin from '@/pages/admin/Portfolio'
import SettingsAdmin from '@/pages/admin/Settings'
import AdminLayout from '@/components/AdminLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'portfolio', element: <PortfolioAdmin /> },
      { path: 'settings', element: <SettingsAdmin /> },
    ],
  },
])
