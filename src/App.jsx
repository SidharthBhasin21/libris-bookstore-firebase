
import { Route, Routes } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import MyNavbar from '../components/Navbar';
import ListingPage from '../pages/List';
import Home from '../pages/Home';

function App() {
  
  return (
    
    <div>
      <MyNavbar />
    
      <Routes>
        <Route path="/" element={< Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/book/list" element={<ListingPage/>} />
      </Routes>
    </div>
  )
}

export default App
