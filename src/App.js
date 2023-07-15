import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from "./pages/Home"
import Navbar from './components/common/Navbar';


function App() {
  return (
    <div className=' min-h-screen w-screen bg-richblack-900 flex flex-col font-inter'>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            {/* <Route path='/login' element={<LoginForm/>}></Route>
            <Route path='/signup' element={<SignupForm/>}></Route> */}
          </Routes>
    </div>
  );
}

export default App;
