import React, { useState } from 'react';
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect } from "react";
import CustomCheckbox from '../components/CustomCheckbox';
import LottieIcon from "../Icon/LottieIcon.tsx"
import Game from "../Icon/Game.json";

const SignupForm: React.FC = () => {

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

  const [participation, setParticipation] = useState(''); // 'no', 'noTeam', 'hasTeam'
  const [teamName, setTeamName] = useState('');

  const [skipRegistration, setSkipRegistration] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    let game = participation !== 'no';
    let hasTeam = participation === 'hasTeam' ? teamName.trim() : null;

    if (participation === 'hasTeam' && !teamName.trim()) {
      setError('لطفاً نام تیم را وارد کنید');
      return;
    }

    // اگر تیم دارد، ظرفیت را چک کن
    if (participation === 'hasTeam') {
      const response = await fetch('http://localhost:3398/creativeDay/game/getGameTeamNameMember', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamName })
      });
      const data = await response.json();
      if (!data.success || !data.isAvailable) {
        setError(data.message || 'ظرفیت تیم تکمیل است');
        return;
      }
    }

    // ارسال اطلاعات به بک‌اند برای ذخیره در سشن
    const saveRes = await fetch('http://localhost:3398/creativeDay/game/save-step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ game, hasTeam }),
    });
    if (!saveRes.ok) {
      setError('خطا در ذخیره اطلاعات.');
      return;
    }

    navigate("/ProgrammingMach", {
      state: {
        teamName: hasTeam,
        participation
      }
    });
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
            <h2 className="font-Potk text-primary-2 text-2xl font-semibold mb-4 text-center"> فرم ثبت نام بازی </h2>

            <DotLottieReact
              src="https://lottie.host/5f1506c5-527f-4115-b171-45e4f06c2e17/QPo5nLk92m.lottie"
              loop
              autoplay
              /> 

{/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
{/* ------------------------------------------------------------  فرم ثبت نام   ----------------------------------------------------------- */}
{/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-4 justify-center px-2">
                <CustomCheckbox
                  id="noParticipation"
                  checked={participation === 'no'}
                  onChange={() => setParticipation('no')}
                  label="قصد شرکت در بازی را ندارم"
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
              {error && <div className="text-red-500 text-center mb-4 font-Peyda font-bold">{error}</div>}
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




{/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
{/* -------------------------------------------------------    NOT Select anything       --------------------------------------------------- */}
{/* ---------------------------------------------------------------------------------------------------------------------------------------- */}

      {/* {isModalOpen && (
        <div className="z-50 fixed inset-0 flex items-center justify-center backdrop-blur-lg ">

          <div className=" bg-[#ffffff03] border  border-white/20 
            shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] py-8  rounded-xl
            max-w-sm lg:w-full w-[83%] backdrop-blur-3xl
            flex flex-col justify-center items-center gap-6">


            <h3 className="lg:text-lg text-sm  font-semibold font-Peyda text-primary-1 text-right text-nowrap ">آیا مطمئن هستید که هیچ گزینه‌ای انتخاب نکردید؟</h3>
            <div className="flex justify-between gap-4 ">
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
      )} */}


<div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(250%_150%_at_50%_20%,#0000_35%,#ff6000_180%)]   lg:[background:radial-gradient(150%_125%_at_50%_30%,#0000_40%,#ff6000_190%)]"></div>

     
    </div>
  );
};

export default SignupForm;
