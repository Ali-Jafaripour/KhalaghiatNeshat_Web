import React from 'react';
import clsx from "clsx";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FlipWords } from "../components/ui/flip-words";
import { useNavigate } from "react-router-dom";



export function FlipWordsDemo() {
  const words = ["متفاوت", "شاداب", "پر از مسابقه", "مفرح"];

  return (
    <div className=" flex justify-center items-center px-4">
  <div className="z-10  mx-auto font-normal  flex flex-col  lg:gap-10 sm:gap-5 gap-5 justify-center">
    <p className="lg:text-right text-center font-Potk text-primary-2 text-nowrap  lg:text-7xl  sm:text-5xl  text-4xl ">خـلاقـیـت و نـشـــاط</p>

    <div className='flex flex-col sm:gap-4 gap-2'>
    <p className='text-right text-primary-1 font-semibold lg:text-4xl  sm:text-3xl text-xl'> انجمن  علمی  مهندسی  کامپیوتر</p>
    <p className="text-right text-primary-1 font-semibold lg:text-4xl  sm:text-3xl text-xl" >
      <FlipWords words={words} /> رویدادی 
    </p>
    </div>

   
    
  </div>
</div>

  );
};

     

const Header: React.FC = () => {
  const navigate = useNavigate(); 
  return (
    <header>
      <div className='lg:h-screen  h-[80vh]'>

      <div className="relative h-full w-full ">


      <div className={clsx(" absolute h-full w-full", 
        "lg:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] lg:[background-size:20px_20px] lg:[mask-image:radial-gradient(ellipse_60%_70%_at_50%_40%,#0004_40%,transparent_100%)]",
        "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_40%,#0003_40%,transparent_100%)]",
        
        
        )}></div>


        <div className={clsx(
            "flex flex-col items-center w-full h-full", 
            "flex-col pt-8 gap-20 justify-around" ,
            "sm:flex-col sm:p-8 xs:gap-16" ,
            "lg:flex-col lg:pt-[2%]  lg:gap-8 lg:justify-around"
          )} >
            
            <div className=' z-10 flex flex-col lg:flex-row lg:gap-32 gap-9'>

                <DotLottieReact
                src="https://lottie.host/4f13aca5-beaf-487c-b5eb-430fc455ea03/OM7reVLeGl.lottie"
                loop
                autoplay
                className='lg:h-96 sm:h-80 h-52  w-auto z-0'
              />

              <FlipWordsDemo/> 

            </div>    
            <div className='lg:flex lg:flex-row lg:w-full lg:justify-center'>

               
            
              <div className='flex justify-end lg:justify-center '>
                  <button 
                  onClick={() => navigate("/Singup")}
                  className="z-10 font-Potk h-fit inline-flex lg:pr-7 pr-4 lg:pl-[6rem] pl-[2.7rem] lg:py-5 py-3 lg:text-xl lg:rounded-3xl  animate-shimmer 
                  items-center justify-center rounded-[1.3rem] border border-primary-border
                  bg-[linear-gradient(110deg,#101010,30%,#272727,50%,#101010)] 
                  bg-[length:190%_100%]   font-medium text-primary-1
                  transition-colors focus:outline-none  opacity-80 text-nowrap overflow-hidden  ">

                    <DotLottieReact
                  src="https://lottie.host/a7ddc0a3-2cef-4a51-abc7-0319918e4be2/95u2jPazu8.lottie"
                  loop
                  autoplay
                  className={clsx('z-20  w-32 h-auto ',
                    'lg:w-52 lg:absolute lg:top-[77%] lg:right-[49.5%]',
                    'absolute top-[86.7%] right-[50%]'
                  )}

                />
                     از اینجا ثبت نام کنید
                  </button>
              </div>
          

                <DotLottieReact
                src="https://lottie.host/14f6c3df-22c9-4d0c-a0e5-398fe1cbcdc3/gryZkMdmVQ.lottie"
                loop
                autoplay
                className={clsx(' sm:h-80 h-44  w-auto ',
                  'lg:h-[29rem] lg:absolute lg:top-[50%] lg:right-[5%]',
                  'absolute top-[70%] right-[-50px] overflow-hidden'
                )}
              />
            </div>
        </div>



         
        </div>
      </div>
    </header>
  );
};
export default Header