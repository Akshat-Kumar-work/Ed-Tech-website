import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from "./pages/Home"
import Navbar from './components/common/Navbar';
import OpenRoute from './components/core/Auth/OpenRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <div className=' min-h-screen w-screen bg-richblack-900 flex flex-col font-inter'>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<OpenRoute> <Login /> </OpenRoute>}></Route>
            <Route path='/signup' element={<OpenRoute> <Signup /></OpenRoute> }></Route>
          </Routes>
    </div>
  );
}

export default App;
