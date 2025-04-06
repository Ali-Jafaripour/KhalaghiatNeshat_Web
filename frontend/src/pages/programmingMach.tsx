import React, { useState } from 'react';
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect } from "react";
import CustomCheckbox from '../components/CustomCheckbox';
import LottieIcon from "../Icon/LottieIcon.tsx"
import Game from "../Icon/Game.json";

const programmingMach: React.FC = () => {

 useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "auto"; 
    };
  }, []);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);   
  const [isModalOpen, setIsModalOpen] = useState(false); // وضعیت باز بودن modal
  const [error, setError] = useState('');  

  const [teamName, setTeamName] = useState('');

  const [skipRegistration, setSkipRegistration] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (skipRegistration) {
      navigate("/dashboard");
      return;
    }

    if (!teamName.trim()) {
      setError('لطفاً نام تیم را وارد کنید');
      setIsModalOpen(true);
      return;
    }
  
    setError('');
    
    navigate("/dashboard");  
  };
  


  return (
    <div className="min-h-screen">

      <div className={clsx("absolute h-full w-full top-0", 
              "lg:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] lg:[background-size:20px_20px] lg:[mask-image:radial-gradient(ellipse_60%_70%_at_50%_40%,#0002_40%,transparent_100%)]",
              "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_10%,#0001_40%,transparent_100%)]",
      )}></div>

      <div className=" flex justify-center items-center mt-16  " >
          {error && <p className="text-red-500 text-center mb-4 font-Peyda font-bold">{error}</p>}
      </div>



        <div className="z-20 flex flex-col gap-8 absolute right-[6.5%] lg:right-[30%]  top-[12%] lg:top-[16%]   w-[87%] lg:w-[40%] p-8 rounded-2xl  backdrop-blur-0 bg-[#ffffff03] border border-white/20 shadow-[inset_0_0_18px_rgba(255,255,255,0.2)] ">
            <h2 className="font-Potk text-primary-2 text-2xl font-semibold mt-1 mb-3 text-center"> فرم ثبت نام مسابقه برنامه نویســی </h2>

            <DotLottieReact
              src="https://lottie.host/6f5f9873-23b3-4d93-b70d-1d7f6aaae94a/tSaaOFLfE0.lottie"
              loop
              autoplay
            />

{/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
{/* ------------------------------------------------------------  فرم ثبت نام   ----------------------------------------------------------- */}
{/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="teamName" className="block font-Peyda text-sm font-medium text-primary-1 text-right mr-3">
                  : نام تیم
                </label>
                <div className="relative"> {/* Add this wrapper div */}
                  <input
                    type="text"
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full pl-2 pr-12 py-[0.6rem] bg-white/5 rounded-lg flex items-center 
                      justify-center shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] 
                      border-2 border-white/10 font-Peyda placeholder:text-primary-placeholder text-right
                      focus:border-primary-2 focus:border-[1px] focus:outline-none text-primary-1"
                    placeholder=".نام تیم خود را وارد کنید"
                  />
                  <div className="absolute top-1/2 right-3 -translate-y-1/2"> 
                    <LottieIcon animationData={Game} width={30} height={30} />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-row items-center gap-2 justify-center">
                <CustomCheckbox
                  id="skipRegistration"
                  checked={skipRegistration}
                  onChange={() => setSkipRegistration(!skipRegistration)}
                  label="قصد شرکت در بازی را ندارم"
                />
              </div>
            </form>

            <div className="flex justify-center items-center">
              <button 
                onClick={handleSubmit}
                className="z-10 lg:w-2/4 w-full font-Peyda h-fit inline-flex lg:px-3 px-4 lg:py-4 py-3 lg:text-xl lg:rounded-xl rounded-xl
                  animate-shimmer items-center justify-center border border-primary-1
                  bg-[linear-gradient(110deg,#101010,30%,#272727,50%,#101010)] 
                  bg-[length:190%_100%] text-primary-1 font-semibold hover:opacity-70 hover:scale-105 
                  focus:outline-none opacity-50 text-nowrap overflow-hidden 
                  transition-transform duration-500">
                {skipRegistration ? 'رفتــن به صفحـــه بعــدی' : 'ثـبت نـام کنیـد'}
              </button>
            </div>
        </div>
        <div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(250%_150%_at_50%_20%,#0000_35%,#ff6000_180%)]   lg:[background:radial-gradient(150%_125%_at_50%_30%,#0000_40%,#ff6000_190%)]"></div>

    </div>
  );
};

export default programmingMach;
