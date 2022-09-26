import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Store from './pages/Store';
import About from './pages/About';
import CheckOut from './pages/CheckOut';
import AppProvider from './context/context';


function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/store" element={<Store />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/checkout" element={<CheckOut />}/>
      </Routes>
    </AppProvider>
   
  );
}

export default App;
