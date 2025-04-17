import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
// @ts-ignore
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// @ts-ignore
import LottieIcon from "../Icon/LottieIcon.tsx";
// @ts-ignore
import Check from "../Icon/Security.json";

// Update the interface to handle multiple team names
interface UserData {
  name: string;
  email: string;
  studentId: string;
  nationalId: string;
  sex: string;
  teamName1: string | null;
  teamName2: string | null;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  // @ts-ignore
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Update the mock data
  useEffect(() => {
    const mockUserData = {
      name: "علی جعفـــری پور",
      email: "alijafaripour82@Gmail.com.com",
      studentId: "12345678",
      nationalId: "1234567890",
      sex: "male",
      teamName1: "تیم برتر",
      teamName2: ""
    };
    setUserData(mockUserData);
  }, []);

  const [isFinalModalOpen, setIsFinalModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsFinalModalOpen(true);
  };

  const handleFinalModalConfirm = () => {
    setIsConfirmed(true);
    setIsFinalModalOpen(false);
    navigate("/");
  
  };

  return (
    <div className="min-h-screen">
      <div className={clsx("absolute h-full w-full top-0",
        "lg:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] lg:[background-size:20px_20px] lg:[mask-image:radial-gradient(ellipse_60%_70%_at_50%_40%,#0002_40%,transparent_100%)]",
        "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_10%,#0001_40%,transparent_100%)]"
      )}></div>

      <div className="z-20 absolute right-[6.5%] lg:right-[30%] top-[10%] lg:top-[20%] w-[87%] lg:w-[40%] p-8 rounded-2xl backdrop-blur-0 bg-[#ffffff03] border border-white/20 shadow-[inset_0_0_18px_rgba(255,255,255,0.2)]">
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary-2 font-Potk">تایید اطلاعات</h2>

        {userData && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <InfoCard label="نام و نام خانوادگی" value={userData.name} />
              <InfoCard label="ایمیل" value={userData.email} />
              <InfoCard label="کد ملی" value={userData.nationalId} />
              <div className="flex gap-4">
                <div className="w-[30%]">
                  <InfoCard label="جنسیت" value={userData.sex === 'male' ? 'آقا' : 'خانم'} />
                </div>
                <div className="w-[70%]">
                  <InfoCard label="شماره دانشجویی" value={userData.studentId} />
                </div>
              </div>
              {userData.teamName1 ? (
                <InfoCard label="نام تیم در بازی X" value={userData.teamName1} />
              ) : (
                <div className="flex flex-col gap-2">
                  <label className="block font-Peyda text-sm font-medium text-primary-1 text-right mr-3">
                    : وضعیت ثبت نام بازی اول
                  </label>
                  <div className="relative">
                    <div className="w-full pl-2 pr-10 py-[0.6rem] bg-white/5 rounded-lg flex items-center 
                      justify-end shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] 
                      border-2 border-white/10 font-Peyda text-right text-red-400">
                      شما در بازی اول ثبت نام نکرده‌اید
                    </div>
                  </div>
                </div>
              )}
              {userData.teamName2 ? (
                <InfoCard label="نام تیم در مسابقه برنامه نویســی " value={userData.teamName2} />
              ) : (
                <div className="flex flex-col gap-2">
                  <label className="block font-Peyda text-sm font-medium text-primary-1 text-right mr-3">
                    : وضعیت ثبت نام بازی دوم
                  </label>
                  <div className="relative">
                    <div className="w-full pl-2 pr-10 py-[0.6rem] bg-white/5 rounded-lg flex items-center 
                      justify-end shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] 
                      border-2 border-white/10 font-Peyda text-right text-red-400">
                      شما در بازی دوم ثبت نام نکرده‌اید
                    </div>
                  </div>
                </div>
              )}
            </div>

            
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleConfirm}
                  className="z-10 lg:w-2/4 w-full font-Peyda h-fit inline-flex lg:px-3 px-4 lg:py-4 py-3 lg:text-xl lg:rounded-xl rounded-xl
                    animate-shimmer items-center justify-center border border-primary-1
                    bg-[linear-gradient(110deg,#101010,30%,#272727,50%,#101010)] 
                    bg-[length:190%_100%] text-primary-1 font-semibold hover:opacity-70 hover:scale-105 
                    focus:outline-none text-nowrap overflow-hidden transition-transform duration-500"
                >
                  تایید اطلاعات
                </button>
              </div>
            
          </div>
        )}
      </div>
      {isFinalModalOpen && (
        <div className="z-50 fixed inset-0 flex items-center justify-center backdrop-blur-lg">
          <div className="bg-[#ffffff03] border border-white/20 
            shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] py-8 rounded-xl max-w-sm lg:w-full w-[83%] backdrop-blur-3xl
            flex flex-col justify-center items-center gap-6">
            <div className='flex flex-col gap-2 justify-center items-center'>
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
            <div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(250%_150%_at_50%_20%,#0000_35%,#ff6000_180%)]   lg:[background:radial-gradient(150%_125%_at_50%_30%,#0000_40%,#ff6000_190%)]"></div>

    </div>
  );
};

const InfoCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-2">
    <label className="block font-Peyda text-sm font-medium text-primary-1 text-right mr-3">
      : {label}
    </label>
    <div className="relative">
      <div className="w-full pl-2 pr-8 lg:pr-2 py-[0.6rem] bg-white/5 rounded-lg flex items-center 
        justify-end lg:justify-center shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] 
        border-2 border-white/10 font-Peyda text-right text-primary-3">
        {value}
      </div>

    </div>

  </div>
);

export default Dashboard;