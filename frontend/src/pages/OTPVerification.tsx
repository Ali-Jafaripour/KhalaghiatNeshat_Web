import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LottieIcon from "../Icon/LottieIcon";
import otpIcon from "../Icon/Calling V5.json";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(120); // 2 minutes
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && element.nextElementSibling) {
      (element.nextElementSibling as HTMLInputElement).focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('لطفا کد 6 رقمی را وارد کنید');
      return;
    }

    // Here you would typically verify the OTP with your API
    // For now, we'll just navigate to the signup page
    navigate('/signup');
  };

  return (
    <div className="min-h-screen">
      <div className="absolute h-full w-full top-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_10%,#0001_40%,transparent_100%)]"></div>

      <div className="flex justify-center items-center mt-16">
        {error && <p className="text-red-500 text-center mb-4 font-Peyda font-bold">{error}</p>}
      </div>

      <div className="z-20 absolute right-[6.5%] lg:right-[30%] top-[14%] lg:top-[20%] w-[87%] lg:w-[40%] p-8 rounded-2xl backdrop-blur-0 bg-[#ffffff03] border border-white/20 shadow-[inset_0_0_18px_rgba(255,255,255,0.2)]">
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary-2 font-Potk">تایید کد ارسال شده</h2>
        <p className="text-center text-primary-1 font-Peyda mb-4">کد ارسال شده به شماره {phoneNumber} را وارد کنید</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex justify-center gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target, idx)}
                className="w-12 h-12 text-center bg-white/5 rounded-lg 
                  shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] 
                  border-2 border-white/10 font-Peyda text-primary-1 text-xl"
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-primary-1 font-Peyda">
              {timer > 0 ? (
                `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`
              ) : (
                <button 
                  onClick={() => setTimer(120)}
                  className="text-primary-2 underline"
                >
                  ارسال مجدد کد
                </button>
              )}
            </p>
          </div>

          <div className="flex justify-center items-center">
            <button 
              className="z-10 lg:w-2/4 w-full font-Peyda h-fit inline-flex lg:px-3 px-4 lg:py-4 py-3 lg:text-xl lg:rounded-xl rounded-xl
                animate-shimmer items-center justify-center border border-primary-1
                bg-[linear-gradient(110deg,#101010,30%,#272727,50%,#101010)] 
                bg-[length:190%_100%] text-primary-1 font-semibold
                transition-colors focus:outline-none opacity-50 text-nowrap overflow-hidden">
              تایید
            </button>
          </div>
        </form>
      </div>

      <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(250%_150%_at_50%_20%,#0000_35%,#ff6000_180%)] lg:[background:radial-gradient(150%_125%_at_50%_30%,#0000_40%,#ff6000_190%)]"></div>
    </div>
  );
};

export default OTPVerification;