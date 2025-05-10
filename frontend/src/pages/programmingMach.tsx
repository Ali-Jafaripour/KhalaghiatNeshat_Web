import React, { useState, useEffect } from 'react';
import clsx from "clsx";
import { useNavigate, useLocation } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
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
  // @ts-ignore

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);   
  // @ts-ignore

  const [isModalOpen, setIsModalOpen] = useState(false); // وضعیت باز بودن modal
  const [error, setError] = useState('');  

  // مشابه Game.tsx از همان متغیرها استفاده می‌کنیم
  const [participation, setParticipation] = useState(''); // 'no', 'noTeam', 'hasTeam'
  const [teamName, setTeamName] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // گرفتن مقادیر از صفحه قبل (Game.tsx)
  useEffect(() => {
    if (location.state) {
      const { teamName: gameTeamName, participation: gameParticipation } = location.state;
      
      // اگر از صفحه قبل تیمی انتخاب شده بود، در اینجا هم نشان بده
      if (gameTeamName) {
        setTeamName(gameTeamName);
        setParticipation('hasTeam');
      }
      
      // اگر در بازی شرکت نمی‌کند، در اینجا هم شرکت نمی‌کند
      if (gameParticipation === 'no') {
        setParticipation('no');
      }
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // تبدیل انتخاب کاربر به مقادیر مناسب برای ذخیره
    let programming = participation !== 'no';
    let programmingTeamName = participation === 'hasTeam' ? teamName.trim() : null;

    // اعتبارسنجی نام تیم
    if (participation === 'hasTeam' && !teamName.trim()) {
      setError('لطفاً نام تیم را وارد کنید');
      return;
    }

    // اگر تیم دارد، ظرفیت را چک کن
    if (participation === 'hasTeam') {
      setIsChecking(true);
      try {
        const response = await fetch('http://localhost:3398/creativeDay/contest/getContestTeamNameMember', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ teamName })
        });
        
        const data = await response.json();
        
        if (!data.success || !data.isAvailable) {
          setError(data.message || 'ظرفیت تیم تکمیل است');
          setIsChecking(false);
          return;
        }
      } catch (error) {
        setError('خطا در ارتباط با سرور');
        setIsChecking(false);
        return;
      }
    }

    // ارسال اطلاعات به بک‌اند برای ذخیره در سشن
    try {
      const saveRes = await fetch('http://localhost:3398/creativeDay/contest/save-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          contest: programming, 
          programmingTeamName 
        }),
      });
      
      if (!saveRes.ok) {
        setError('خطا در ذخیره اطلاعات.');
        return;
      }

      // انتقال به صفحه بعدی
      navigate("/dashboard", {
        state: {
          teamName: programmingTeamName,
          participation
        }
      });
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsChecking(false);
    }
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

        <div className="z-20 flex flex-col gap-8 absolute right-[6.5%] lg:right-[30%] top-[8%] lg:top-[10%] w-[87%] lg:w-[40%] p-8 rounded-2xl backdrop-blur-0 bg-[#ffffff03] border border-white/20 shadow-[inset_0_0_18px_rgba(255,255,255,0.2)] ">
            <h2 className="font-Potk text-primary-2 text-2xl font-semibold mt-1 mb-3 text-center"> فرم ثبت نام مسابقه برنامه نویســی </h2>

            <DotLottieReact
              src="https://lottie.host/6f5f9873-23b3-4d93-b70d-1d7f6aaae94a/tSaaOFLfE0.lottie"
              loop
              autoplay
            />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-4 justify-center">
                <CustomCheckbox
                  id="noParticipation"
                  checked={participation === 'no'}
                  onChange={() => setParticipation('no')}
                  label="قصد شرکت در مسابقه را ندارم"
                />
                <CustomCheckbox
                  id="noTeam"
                  checked={participation === 'noTeam'}
                  onChange={() => setParticipation('noTeam')}
                  label="قصد شرکت دارم ولی تیم ندارم"
                />
                <CustomCheckbox
                  id="hasTeam"
                  checked={participation === 'hasTeam'}
                  onChange={() => setParticipation('hasTeam')}
                  label="تیم دارم"
                />
                {participation === 'hasTeam' && (
                  <div className="relative mt-2">
                    <input
                      type="text"
                      id="teamName"
                      value={teamName}
                      onChange={e => setTeamName(e.target.value)}
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
                )}
              </div>
              
              {error && <div className="text-red-500 text-center font-Peyda font-bold">{error}</div>}
              
              <div className="flex justify-center items-center">
                <button 
                  type="submit"
                  className="z-10 lg:w-2/4 w-full font-Peyda h-fit inline-flex lg:px-3 px-4 lg:py-4 py-3 lg:text-xl lg:rounded-xl rounded-xl
                    animate-shimmer items-center justify-center border border-primary-1
                    bg-[linear-gradient(110deg,#101010,30%,#272727,50%,#101010)] 
                    bg-[length:190%_100%] text-primary-1 font-semibold hover:opacity-70 hover:scale-105 
                    focus:outline-none opacity-50 text-nowrap overflow-hidden 
                    transition-transform duration-500"
                  disabled={
                    (participation === 'hasTeam' && !teamName.trim()) ||
                    participation === ''
                  }
                >
                  ثبت‌نام
                </button>
              </div>
            </form>
        </div>
        <div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(250%_150%_at_50%_20%,#0000_35%,#ff6000_180%)]   lg:[background:radial-gradient(150%_125%_at_50%_30%,#0000_40%,#ff6000_190%)]"></div>

    </div>
  );
};

export default programmingMach;
