import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import './app.css'
import Home from './components/Home'
import Login from './components/Login.jsx'
import Register from './components/Register'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider,Route } from 'react-router-dom'
import CreateQuery from './components/query/CreateQuery'
import Dashboard from './components/dashboard/Dashboard'
import Events from './components/events/Events'
import Queries from './components/query/Queries'
import CreateEvent from './components/events/CreateEvent.jsx'
import ProtectedRoute from './components/shared/ProtectedRoute'
import UnauthorizedPage from './components/shared/UnauthorizedPage'
import Profile from './components/Profile'
import ManageQueries from './components/query/ManageQueries'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="createQuery" element={<CreateQuery />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="events" element={<Events />} />
      <Route path="queries" element={<Queries />} />
      <Route 
        path='profile' 
        element={
          <ProtectedRoute allowedRoles={["student", "teacher", "tpc", "tpo"]}>
            <Profile/>
          </ProtectedRoute>
        }
      />
      <Route
        path="createEvent"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <CreateEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="createQuery"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <CreateQuery />
          </ProtectedRoute>
        }
      />
      <Route 
        path='events'
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <Events />
          </ProtectedRoute>
        }
      />
      <Route
        path='manageQueries'
        element={
          <ProtectedRoute allowedRoles={["tpc", "tpo"]}>
            <ManageQueries />
          </ProtectedRoute>
        }
      />
      <Route path="unauthorized" element={<UnauthorizedPage />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
