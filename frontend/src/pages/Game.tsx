import React, { useState } from 'react';
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import { useNavigate } from "react-router-dom";
// import LottieIcon from "../Icon/LottieIcon.tsx"
// import icon1 from "../Icon/icon1.json";
// import Call from "../Icon/Calling V5.json";
// import id from "../Icon/Face Id.json";
// import id2 from "../Icon/Security.json";
import { useEffect } from "react";


const SignupForm: React.FC = () => {

 useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "auto"; 
    };
  }, []);

  // State برای ذخیره گزینه‌های انتخابی کاربر و وضعیت نمایش modal
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);   
  const [isFinalModalOpen, setIsFinalModalOpen] = useState(false);  
  const [isModalOpen, setIsModalOpen] = useState(false); // وضعیت باز بودن modal
  const [error, setError] = useState(''); // برای نمایش پیام خطا

  // تابعی برای مدیریت تغییرات در انتخاب گزینه‌ها
  const handleOptionChange = (option: string) => {

    // اگر گزینه قبلاً انتخاب شده باشد، آن را حذف می‌کنیم
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
      console.log( "name of selecton 2" + selectedOptions)

    } else {
      // اگر گزینه 4 یا 5 انتخاب شده باشد، تنها یکی از آن‌ها باید انتخاب شود
      if (option === 'option4' || option === 'option5') {
        // اگر یکی از گزینه‌های 4 یا 5 قبلاً انتخاب شده باشد، گزینه دیگر حذف می‌شود
        if (selectedOptions.includes('option4') || selectedOptions.includes('option5')) {
          setSelectedOptions([option]);
          console.log( "name of selecton 3" + selectedOptions)

        } else {
          // اگر هیچکدام انتخاب نشده باشد، گزینه جدید به آرایه اضافه می‌شود
          setSelectedOptions([...selectedOptions, option]);
          console.log( "result open   ==>" + selectedOptions)
        }
      } else {
        // برای گزینه‌های دیگر، فقط آن گزینه به لیست انتخابی اضافه می‌شود
        setSelectedOptions([...selectedOptions, option]);
        console.log( "name of selecton 5" + selectedOptions)
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (selectedOptions.length === 0) {
      
      setIsModalOpen(true); 
      // console.log( "result of selecton" + selectedOptions)
      return;

    }

    setError(''); 
   
    setIsFinalModalOpen(true);
    };


  const handleModalConfirm = (isConfirmed: boolean) => {

    if (isConfirmed) {
      setIsFinalModalOpen(true);
    } else {
      setSelectedOptions([]);
      setIsModalOpen(false); 
    }
  };
  const navigate = useNavigate();
  const handleFinalModalConfirm = () => {
    setIsFinalModalOpen(false); 
    navigate("/");  };




  return (
    <div className="min-h-screen">

      <div className={clsx("absolute h-full w-full top-0", 
              "lg:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] lg:[background-size:20px_20px] lg:[mask-image:radial-gradient(ellipse_60%_70%_at_50%_40%,#0002_40%,transparent_100%)]",
              "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_10%,#0001_40%,transparent_100%)]",
      )}></div>

      <div className=" flex justify-center items-center mt-16  " >
          {error && <p className="text-red-500 text-center mb-4 font-Peyda font-bold">{error}</p>}
      </div>



        <div className="z-20 flex flex-col gap-8 absolute right-[6.5%] lg:right-[30%]  top-[14%] lg:top-[20%]   w-[87%] lg:w-[40%] p-8 rounded-2xl  backdrop-blur-0 bg-[#ffffff03] border border-white/20 shadow-[inset_0_0_18px_rgba(255,255,255,0.2)] ">
            <h2 className="text-2xl font-semibold mb-4 text-center">  فرم ثبت نام بازی ها</h2>

            <DotLottieReact
              src="https://lottie.host/5f1506c5-527f-4115-b171-45e4f06c2e17/QPo5nLk92m.lottie"
              loop
              autoplay
              /> 

{/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
{/* ------------------------------------------------------------  فرم ثبت نام   ----------------------------------------------------------- */}
{/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">گزینه‌ها</label>
                <div className="space-y-2">
                  <div>
                    <input
                      type="checkbox"
                      id="option1"
                      checked={selectedOptions.includes('option1')} // اگر گزینه انتخاب شده باشد، تیک زده می‌شود
                      onChange={() => handleOptionChange('option1')} // هنگام تغییر، تابع handleOptionChange اجرا می‌شود
                    />
                    <label htmlFor="option1" className="ml-2">گزینه 1</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="option2"
                      checked={selectedOptions.includes('option2')}
                      onChange={() => handleOptionChange('option2')}
                    />
                    <label htmlFor="option2" className="ml-2">گزینه 2</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="option3"
                      checked={selectedOptions.includes('option3')}
                      onChange={() => handleOptionChange('option3')}
                    />
                    <label htmlFor="option3" className="ml-2">گزینه 3</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="option4"
                      checked={selectedOptions.includes('option4')}
                      onChange={() => handleOptionChange('option4')}
                    />
                    <label htmlFor="option4" className="ml-2">گزینه 4</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="option5"
                      checked={selectedOptions.includes('option5')}
                      onChange={() => handleOptionChange('option5')}
                    />
                    <label htmlFor="option5" className="ml-2">گزینه 5</label>
                  </div>
                </div>
              </div>
            </form>

{/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
{/* ----------------------------------------------------------     button       ------------------------------------------------------------ */}
{/* ---------------------------------------------------------------------------------------------------------------------------------------- */}

             <div className="flex justify-center items-center">
              <button 
              onClick={handleSubmit} // اینجا تابع را متصل می‌کنیم”
                className="z-10 lg:w-2/4  w-full font-Peyda  h-fit inline-flex lg:px-3 px-4  lg:py-4 py-3 lg:text-xl lg:rounded-xl  rounded-xl
                  animate-shimmer items-center justify-center  border border-primary-1
                  bg-[linear-gradient(110deg,#101010,30%,#272727,50%,#101010)] 
                  bg-[length:190%_100%]  text-primary-1 font-semibold hover:opacity-70 hover:scale-105 
                   focus:outline-none  opacity-50 text-nowrap overflow-hidden 
                   transition-transform duration-500">
                        ثـبت نـام کنیـد
              </button>
          </div>



        </div>




{/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
{/* -------------------------------------------------------    NOT Select anything       --------------------------------------------------- */}
{/* ---------------------------------------------------------------------------------------------------------------------------------------- */}

      {isModalOpen && (
        <div className="z-50 fixed inset-0 flex items-center justify-center backdrop-blur-lg ">

          <div className=" bg-[#ffffff03] border  border-white/20 
            shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] py-8  rounded-xl
            max-w-sm lg:w-full w-[83%] backdrop-blur-3xl
            flex flex-col justify-center items-center gap-6">


            <h3 className="lg:text-lg text-sm  font-semibold font-Peyda text-primary-1 text-right text-nowrap ">آیا مطمئن هستید که هیچ گزینه‌ای انتخاب نکردید؟</h3>
            <div className="flex justify-between gap-4 ">
              {/* دکمه‌های تأیید و رد در modal */}
              <button
                className="bg-red-600 bg-opacity-20 border border-red-900 border-opacity-60 text-primary-placeholder  font-Peyda font-semibold px-4 py-2 rounded-lg text-nowrap"
                onClick={() => handleModalConfirm(false)} 
              >
                نه، برمی‌گردم
              </button>
              <button
                className="bg-green-700 bg-opacity-20 border border-green-900 border-opacity-60 text-primary-placeholder font-Peyda font-semibold px-4 py-2 rounded-lg text-nowrap"
                onClick={() => handleModalConfirm(true)} 
              >
                بله، ادامه می‌دهم
              </button>
            </div>
          </div>
        </div>
      )}


{/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
{/* -------------------------------------------------------------     Final popab       ---------------------------------------------------- */}
{/* ---------------------------------------------------------------------------------------------------------------------------------------- */}

      {isFinalModalOpen && (
          <div className="z-50 fixed inset-0 flex items-center justify-center backdrop-blur-lg">
            <div className="bg-[#ffffff03] border border-white/20 
              shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] py-8 rounded-xl max-w-sm lg:w-full w-[83%] backdrop-blur-3xl
              flex flex-col justify-center items-center gap-6">

              <div className=' flex flex-col gap-2 justify-center items-center'>
                <h3 className="lg:text-lg text-sm font-semibold font-Peyda text-primary-1 text-right text-nowrap">
                !  فرم شما با موفقیت ارسال شد 
                </h3>
                <h4 className="lg:text-lg text-sm font-semibold font-Peyda text-primary-1 text-right text-nowrap">
                ممنون از همراهیتون
                </h4>
              </div>



              <div className="flex justify-between gap-4">
                <button
                  className="bg-green-600 bg-opacity-20 border border-green-900 border-opacity-60 text-primary-placeholder font-Peyda font-semibold px-4 py-2 rounded-lg text-nowrap"
                  onClick={handleFinalModalConfirm}
                >
                  باشه
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default SignupForm;
