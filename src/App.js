import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from "./pages/Home"
import Navbar from './components/common/Navbar';
import OpenRoute from './components/core/Auth/OpenRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import About from './pages/About';
import Contact from "./pages/Contact"
import MyProfile from './components/core/Dashboard/MyProfile';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Error from "./pages/Error"
import Settings from "./components/core/Dashboard/Settings/index"

function App() {
  return (
    <div className=' min-h-screen w-screen bg-richblack-900 flex flex-col font-inter'>
          <Navbar></Navbar>
          <Routes>
          
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<OpenRoute> <Login /> </OpenRoute>}></Route>
            <Route path='/signup' element={<OpenRoute> <Signup /></OpenRoute> }></Route>
            <Route path='/reset-password'element={<OpenRoute> <ResetPassword/> </OpenRoute> }></Route>
            <Route path='/update-password/:id'element={<OpenRoute> <UpdatePassword/> </OpenRoute> }></Route>
            <Route path='/verify-email'element={ <OpenRoute> <VerifyEmail/></OpenRoute>  }></Route>
            <Route path='/about'element={ <OpenRoute> <About/></OpenRoute>  }></Route>
            <Route path="/contact" element={<Contact />} />

            <Route element={ <PrivateRoute> <Dashboard/> </PrivateRoute>} >
            <Route path='/dashboard/my-profile' element={  <MyProfile/>  }/> 
            <Route path="dashboard/Settings" element={<Settings />}/>
            </Route>

            <Route path='*' element={<Error/>} />

            

           
          </Routes>
    </div>
  );
}

export default App;
