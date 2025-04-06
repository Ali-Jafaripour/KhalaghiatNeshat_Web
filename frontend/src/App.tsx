import React from 'react';
import PhoneVerification from './pages/PhoneVerification';
import OTPVerification from './pages/OTPVerification';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, Signup,Game,Dashboard,ProgrammingMach } from "./pages";
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
           <Route path="/Signup" element={<Signup />} />
           <Route path="/GameForm" element={< Game/>} />
           <Route path="/Dashboard" element={< Dashboard/>} />
           <Route path="/ProgrammingMach" element={<ProgrammingMach />} />

         </Routes>
      </Background>
    </Router>
  </>

  );
};


export default App;