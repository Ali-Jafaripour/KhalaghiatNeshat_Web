import React from 'react';
import PhoneVerification from './pages/PhoneVerification';
import OTPVerification from './pages/OTPVerification';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, Signup,Game } from "./pages";
import {Background} from "./components/ui"
import './index.css'

const App: React.FC = () => {
  return (
    <>
     <Router>
       <Background backgroundColor="#101010" opacity={0.36}>
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/PhoneVerification" element={<PhoneVerification />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
           <Route path="/Singup" element={<Signup />} />
           <Route path="/GameForm" element={< Game/>} />
         </Routes>
      </Background>
    </Router>
  </>

  );
};


export default App;