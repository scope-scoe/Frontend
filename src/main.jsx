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
import StudentDashboard from './components/dashboard/StudentDashboard'
import Events from './components/events/Events'
import Queries from './components/query/Queries'
import CreateEvent from './components/events/CreateEvent.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='createQuery' element={<CreateQuery/>}/>
      <Route path='dashboard' element={<StudentDashboard/>}/>
      <Route path='events' element={<Events/>}/>
      <Route path='queries' element={<Queries/>}/>
      <Route path='createEvent' element={<CreateEvent/>}/>
      <Route path='createQuery' element={<CreateQuery/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
