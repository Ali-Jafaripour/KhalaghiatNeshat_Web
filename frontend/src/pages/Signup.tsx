import clsx from "clsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LottieIcon from "../Icon/LottieIcon.tsx"
import icon1 from "../Icon/icon1.json";
import Email from "../Icon/mail.json";
import Isex from "../Icon/Sex.json";
import id from "../Icon/Face Id.json";
import id2 from "../Icon/Security.json";
import CustomCheckbox from '../components/CustomCheckbox';





import React, { useState } from 'react';

const SignupForm: React.FC = () => {

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "auto"; 
    };
  }, []);

  const [loopAnimation, setLoopAnimation] = useState(true); 
  const handleDivClick = () => {
    setLoopAnimation(true);  
  };



  // States for form fields
  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [studentId, setstudentId] = useState('');
  const [nationalId, setnationalId] = useState('');
  const [sex, setSex] = useState('');
  // State for error messages
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !studentId || !email || !nationalId) {
      setError('!!لطفا تمام فیلدها را پر کنید'  );
      return;
    }

    
    if (nationalId.length !== 10) {
      setError('شماره ملی صحیح نمیباشد');
      return;
    }

    // if (studentId.length !== 8 ) {
        
    //   setError('کد دانشجویی نمی باشد');
    //   return;
    // }

    setError('');
    // Handle successful form submission (e.g., send data to API)
    console.log('فرم با موفقیت ارسال شد');
    navigate("/GameForm");
  };
  const navigate = useNavigate();
  return (

    <div className="min-h-screen">

      <div className={clsx("absolute h-full w-full top-0", 
        "lg:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] lg:[background-size:20px_20px] lg:[mask-image:radial-gradient(ellipse_60%_70%_at_50%_40%,#0002_40%,transparent_100%)]",
        "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_10%,#0001_40%,transparent_100%)]",
      )}></div>

      <div className=" flex justify-center items-center mt-16  " >
          {error && <p className="text-red-500 text-center mb-4 font-Peyda font-bold">{error}</p>}
      </div>


      <div className="z-20 absolute right-[6.5%] lg:right-[30%]  top-[14%] lg:top-[20%]   w-[87%] lg:w-[40%] p-8 rounded-2xl  backdrop-blur-0 bg-[#ffffff03] border border-white/20 shadow-[inset_0_0_18px_rgba(255,255,255,0.2)] ">

        <h2 className="text-2xl font-semibold mb-6 text-center text-primary-2 font-Potk">فرم ثبت نام</h2>


        <form onSubmit={handleSubmit} className="space-y-5">

          <div    className="flex flex-col gap-2">
            <label htmlFor="name" className="block font-Peyda text-sm font-medium text-primary-1 text-right mr-3">  : نــام و نــام خانوادگی </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={handleDivClick} 
              className="w-full  pl-2 pr-12 py-[0.6rem] bg-white/5 rounded-lg flex items-center 
                justify-center shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] 
                border-2 border-white/10  font-Peyda placeholder:text-primary-placeholder text-right"

              placeholder=".نام کامل خود را وارد کنید"
            />
            <div className="absolute  top-[7.3rem] right-10"> <LottieIcon animationData={icon1} width={40} height={40} loop={loopAnimation}  /></div>
           
          </div>

          <div className="flex flex-col gap-2">

        {/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------  National ID   ------------------------------------------------------------ */}
        {/* ---------------------------------------------------------------------------------------------------------------------------------------- */}

            <label htmlFor="phone" className="block font-Peyda text-sm font-medium text-primary-1 text-right mr-3">  : شماره ملــی    </label>
            <input
              type="number"
              id="nationalId"
              value={nationalId}
              onChange={(e) => setnationalId(e.target.value)}
              className="w-full  pl-2 pr-12  py-[0.6rem] bg-white/5 rounded-lg flex items-center 
              justify-center shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] 
              border-2 border-white/10 font-Peyda placeholder:text-primary-placeholder text-right"

              placeholder=".شماره ملی خود را وارد کنید"
            />
            <div className="absolute  top-[13.3rem] right-10"> <LottieIcon animationData={id} width={40} height={40}  /></div>
          </div>

        {/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------  Student ID   ------------------------------------------------------------ */}
        {/* ---------------------------------------------------------------------------------------------------------------------------------------- */}

          <div className="flex flex-row gap-4 justify-between">

            <div className="flex flex-col w-[50%] lg:w-[40%] gap-2">
              <label htmlFor="sex" className="block font-Peyda lg:text-sm text-xs font-medium text-primary-1 text-right mr-3">  : جنسیت   </label>
                <div className="flex gap-2 lg:gap-4 w-full lg:pl-6 pl-2 pr-2 py-[0.1rem] bg-white/5 rounded-lg items-center 
                  justify-between shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] 
                  border-2 border-white/10 font-Peyda">

                  <div className="flex flex-row lg:w-[80%] justify-around gap-2 lg:gap-0">     
                    <CustomCheckbox
                      id="female"
                      checked={sex === 'female'}
                      onChange={() => setSex(sex === 'female' ? '' : 'female')}
                      label="خانم"
                      
                    />
                    <CustomCheckbox
                      id="male"
                      checked={sex === 'male'}
                      onChange={() => setSex(sex === 'male' ? '' : 'male')}
                      label="آقا"
                    />
                  </div>

                  <div>
                    <LottieIcon animationData={Isex} width={40} height={40} />
                  </div>
                </div>
            </div>
            
            <div className="flex flex-col w-[60%] gap-2">

              <label htmlFor="StudentID" className="block font-Peyda lg:text-sm text-xs font-medium text-primary-1 text-right mr-3 ">  : شماره دانشجویی    </label>
                  <input
                    type="tel"
                    id="studentId"
                    value={studentId}
                    onChange={(e) => setstudentId(e.target.value)}
                    className="w-full  pl-2 pr-12  py-[0.6rem] bg-white/5 rounded-lg flex items-center 
                    justify-center shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] 
                    border-2 border-white/10 font-Peyda placeholder:text-primary-placeholder text-right"

                    placeholder=".شماره دانشجویی خود را وارد کنید"
                  />
                  <div className="absolute  top-[19.3rem] right-10"> 
                  <LottieIcon animationData={id2} width={40} height={40} />
                  </div>
            </div>
        
          </div>


        {/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------      email     ------------------------------------------------------------ */}
        {/* ---------------------------------------------------------------------------------------------------------------------------------------- */}

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="block font-Peyda text-sm font-medium text-primary-1 text-right mr-3">  : ایمیل   </label>
            <input
              type="tel"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full  pl-2 pr-12  py-[0.6rem] bg-white/5 rounded-lg flex items-center 
              justify-center shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] 
              border-2 border-white/10 font-Peyda placeholder:text-primary-placeholder text-right"

              placeholder=".ایمیل خود را وارد کنید"
            />
            <div className="absolute  top-[25.3rem] right-10"> <LottieIcon animationData={Email} width={40} height={40}  /></div>
          </div>

         
        {/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
        {/* ----------------------------------------------------------     button       ------------------------------------------------------------ */}
        {/* ---------------------------------------------------------------------------------------------------------------------------------------- */}


          <div className="flex justify-center items-center">
              <button 
                      
                className="z-10 lg:w-2/4  w-full font-Peyda  h-fit inline-flex lg:px-3 px-4  lg:py-4 py-3 lg:text-xl lg:rounded-xl  rounded-xl
                  animate-shimmer items-center justify-center  border border-primary-1
                  bg-[linear-gradient(110deg,#101010,30%,#272727,50%,#101010)] 
                  bg-[length:190%_100%]  text-primary-1 font-semibold
                  transition-colors focus:outline-none  opacity-50 text-nowrap overflow-hidden  ">
                        ثـبت نـام کنیـد
              </button>
          </div>

        </form>
      </div>

      {/* <BackgroundLines className="absolute top-[25%] lg:top-[10%]  lg:opacity-50 opacity-60  z-10"/> */}
      <div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(250%_150%_at_50%_20%,#0000_35%,#ff6000_180%)]   lg:[background:radial-gradient(150%_125%_at_50%_30%,#0000_40%,#ff6000_190%)]"></div>
   


    </div>

     
  );
};

export default SignupForm;