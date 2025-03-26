import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LottieIcon from "../Icon/LottieIcon";
import phoneIcon from "../Icon/Calling V5.json";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const PhoneVerification: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length !== 11) {
      setError('لطفا شماره موبایل معتبر وارد کنید');
      return;
    }

    // Here you would typically make an API call to send OTP
    // For now, we'll just navigate to the OTP confirmation page
    navigate('/verify-otp', { state: { phoneNumber } });
  };

  return (
    <div className="min-h-screen">
      <div className="absolute h-full w-full top-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_10%,#0001_40%,transparent_100%)]"></div>

      <div className="flex justify-center items-center mt-16">
        {error && <p className="text-red-500 text-center mb-4 font-Peyda font-bold">{error}</p>}
      </div>

      <div className="z-20 absolute right-[6.5%] lg:right-[30%] top-[14%] lg:top-[20%] w-[87%] lg:w-[40%] p-8 rounded-2xl backdrop-blur-0 bg-[#ffffff03] border border-white/20 shadow-[inset_0_0_18px_rgba(255,255,255,0.2)]">
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary-2 font-Potk">تایید شماره موبایل</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="block font-Peyda text-sm font-medium text-primary-1 text-right mr-3">: شماره موبایل</label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full pl-2 pr-12 py-[0.6rem] bg-white/5 rounded-lg flex items-center 
                justify-center shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] 
                border-2 border-white/10 font-Peyda placeholder:text-primary-placeholder text-right"
              placeholder=".شماره موبایل خود را وارد کنید"
            />
            <div className="absolute top-[7.3rem] right-10">
              <LottieIcon animationData={phoneIcon} width={40} height={40} />
            </div>
          </div>
          <div>
            <DotLottieReact
                src="https://lottie.host/14a25ccb-a976-41ba-b554-56b65d549cdf/Pk1x16vKnn.lottie"
                loop
                autoplay
            />
            <div className="flex justify-center items-center">
                <button 
                className="z-10 lg:w-2/4 w-full font-Peyda h-fit inline-flex lg:px-3 px-4 lg:py-4 py-3 lg:text-xl lg:rounded-xl rounded-xl
                    animate-shimmer items-center justify-center border border-primary-1
                    bg-[linear-gradient(110deg,#101010,30%,#272727,50%,#101010)] 
                    bg-[length:190%_100%] text-primary-1 font-semibold
                    transition-colors focus:outline-none opacity-50 text-nowrap overflow-hidden">
                ارسال کد تایید
                </button>
            </div>
          </div>
        </form>



        
      </div>

      <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(250%_150%_at_50%_20%,#0000_35%,#ff6000_180%)] lg:[background:radial-gradient(150%_125%_at_50%_30%,#0000_40%,#ff6000_190%)]"></div>
    </div>
  );
};

export default PhoneVerification;