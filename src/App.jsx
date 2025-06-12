import './App.css'
import Footer from '../src/components/shared/Footer';
import { Outlet } from 'react-router-dom'
import Navbar from '../src/components/shared/Navbar' 
import { Toaster } from './components/ui/sonner';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar />
        <Outlet />
        <br />
        <Footer />
        <Toaster />
      </PersistGate>
    </Provider>
  );
}

export default App
