import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import User from './user/User'
import Adminlogin from './admin/login/Login.jsx'
import AppLayout from './admin/layout/AppLayout';
import Signup from './admin/signup/Signup';
import Submitsuccess from './user/Submitsuccess';


function App() {
  return (
   <Router>
      <Routes>
      <Route path='' element={<User/>} />
      <Route path='contact-success' element={<Submitsuccess/>} />

      <Route path='x-login' element={<Adminlogin/>} />
      <Route path='x-signup' element={<Signup/>} />
      <Route path="*" name="Home" element={<AppLayout/>} />   
      </Routes>
   </Router>
  );
}

export default App;
