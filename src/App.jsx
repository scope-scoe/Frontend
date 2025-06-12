import './App.css'
import Footer from '../src/components/shared/Footer';
import { Outlet } from 'react-router-dom'
import Navbar from '../src/components/shared/Navbar' 
import { Toaster } from './components/ui/sonner';


function App() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <br />
      <Footer/>
      <Toaster/>
    </>
  )
}

export default App
