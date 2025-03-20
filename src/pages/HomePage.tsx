import React from 'react';
import { Footer, Header,Test } from '../components';
import { Timeline } from '../components/ui/timeline';




const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Test/>
      <div className="h-auto w-full py-2 px-2">
        <TimelineDemo />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;





export function TimelineDemo() {
  const data = [
    {
      title: "افتتاحیه",
      content: (
        <div>
          <p className=" text-primary-1 text-xs md:text-sm font-normal mb-8 text-right">
           یه جمله در باره ی افتتحایه مراسم
          </p>
          <p className=" text-primary-1 text-xs md:text-sm font-normal mb-8 text-right">
          یه سری چرت و پرت دیگ برای افتتاحیه این رویداد 
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="../../public/images/IMG_ef5925.JPG"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="../../public/images/IMG_ef2239 (1).JPG"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="../../public/images/IMG_ef2239 (2).JPG"
              alt="bento template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="../../public/images/IMG_ef2239 (3).JPG"
              alt="cards template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "مسابقات ",
      content: (
        <div>
          <p className="text-primary-1 text-xs md:text-sm font-normal mb-4 text-right">
          یه جمله در باره ی مسابقات مراسم
          </p>
          <div className="mb-8 flex flex-col justify-center items-end">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
             مستر ربات✅  
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
             اسکوِید گیم✅
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
             بازی های حرکتی✅
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
             تایپ سریع و برد گیم✅
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
             مسابقه برنامه نویسی✅
            </div>
          </div>
          <div className="h-72 lg:h-auto grid grid-cols-10  grid-rows-7  gap-3 lg:gap-6">

           
            <img
              src="../../public/images/IMG_G2753.JPG"
              alt="startup template"
              width={500}
              height={500}
              className="col-span-5 row-span-2 rounded-lg object-cover h-full md:h-44 lg:h-60 w-full "
            />
            <img
              src="../../public/images/IMG_G3336.JPG"
              alt="startup template"
              width={500}
              height={500}
              className="col-span-5 row-span-2 rounded-lg object-cover h-full md:h-44 lg:h-60 w-full " />




            <img
              src="../../public/images/IMG_6732.JPG"
              alt="startup template"
              width={500}
              height={500}
              className="col-span-3 row-span-3 rounded-lg object-cover h-full md:h-44 lg:h-60 w-full  "
            />
            <img
              src="../../public/images/IMG_2863.JPG"
              alt="startup template"
              width={500}
              height={500}
              className="col-span-4 row-span-3 rounded-lg object-cover h-full md:h-44 lg:h-60 w-full "
            />
            <img
              src="../../public/images/IMG_3463.JPG"
              alt="startup template"
              width={500}
              height={500}
              className="col-span-3 row-span-3 rounded-lg object-cover h-full md:h-44 lg:h-60 w-full "
            />





            <img
              src="../../public/images/IMG_G6244.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="col-span-5 row-span-2 rounded-lg object-cover h-full md:h-44 lg:h-60 w-full "
            />

            <img
              src="../../public/images/IMG_G6435.JPG"
              alt="startup template"
              width={500}
              height={500}
              className="col-span-5 row-span-2 rounded-lg object-cover h-full md:h-44 lg:h-60 w-full "
            />
            
          </div>
        </div>
      ),
    },
    {
      title: "اختتامیه",
      content: (
        <div>
          <p className="text-primary-1 text-xs md:text-sm font-normal mb-8 text-right">
          یه جمله در باره ی اختتحایه مراسم    
          </p>



         
          <div className="h-72 lg:h-auto grid grid-cols-10  grid-rows-7  gap-3 lg:gap-6">

           
            <img
              src="../../public/images/IMG_ek3578.JPG"
              alt="startup template"
              width={500}
              height={500}
              className="col-span-5 row-span-2 rounded-lg object-cover h-full md:h-44 lg:h-60 w-full "
            />
            <img
              src="../../public/images/IMG_ek3578.JPG"
              alt="startup template"
              width={500}
              height={500}
              className="col-span-5 row-span-2 rounded-lg object-cover h-full md:h-44 lg:h-60 w-full " />




            <img
              src="../../public/images/IMG_ek6946.JPG"
              alt="startup template"
              width={500}
              height={500}
              className="col-span-7 row-span-3 rounded-lg object-cover h-full md:h-44 lg:h-auto w-full  "
            />
            <img
              src="../../public/images/IMG_ek2485.JPG"
              alt="startup template"
              width={500}
              height={500}
              className="col-span-3 row-span-3 rounded-lg object-cover h-full md:h-44 lg:h-full w-full "
            />


            <img
              src="../../public/images/IMG_ek3578.JPG"
              alt="startup template"
              width={500}
              height={500}
              className="col-span-5 row-span-2 rounded-lg object-cover h-full md:h-44 lg:h-60 w-full "
            />

            <img
              src="../../public/images/IMG_ek3578.JPG"
              alt="startup template"
              width={500}
              height={500}
              className="col-span-5 row-span-2 rounded-lg object-cover h-full md:h-44 lg:h-60 w-full "
            />
            
          </div>

        </div>
      ),
    },
  ];

  return (
    <div className="w-full relative">
      {/* تایم‌لاین */}
      <Timeline data={data} />
    </div>
  );
}