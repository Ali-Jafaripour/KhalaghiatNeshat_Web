import React from 'react';
import { motion } from 'framer-motion';
import ButtonSecendry from "./ui/ButtonSecendry"; 

import Git from "../Icon/brand-github.svg"
import instagram from "../Icon/brand-instagram.svg"
import linkedin from "../Icon/brand-linkedin.svg"
import telegram from "../Icon/brand-telegram.svg"


const Footer: React.FC = () => {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <footer className="relative font-Peyda p-10 pt-10 mt-28   [background:radial-gradient(150%_125%_at_50%_30%,#0000_40%,#ff6000_100%)]">
      <div className="relative  w-full ">

        <div className="relative z-10 container mx-auto px-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-primary-3">
            
            <motion.div 
              className="space-y-4"
              initial={fadeInUp.initial}
              whileInView={fadeInUp.animate}
              transition={fadeInUp.transition}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold">درباره ما</h3>
              <p className="text-sm opacity-80">
                انجمن علمی کامپیوتر دانشگاه یزد </p>
            </motion.div>

            <motion.div 
              className="space-y-4"
              initial={fadeInUp.initial}
              whileInView={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold">تماس با ما</h3>
              <div className="space-y-2 text-sm opacity-80">
                <p>ایمیل: example@example.com</p>
                <p>تلفن: 123-456-7890</p>
                <p>آدرس: بابل، خیابان شریعتی</p>
              </div>
            </motion.div>

            <motion.div 
              className="space-y-4"
              initial={fadeInUp.initial}
              whileInView={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold">لینک‌های مفید</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li><ButtonSecendry text="خـــانه" /></li>
                <li><ButtonSecendry text="درباره ما" /></li>
                <li><ButtonSecendry text="تماس با ما" /></li>
              </ul>
            </motion.div>

            <motion.div 
              className="space-y-4"
              initial={fadeInUp.initial}
              whileInView={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold">شبکه‌های اجتماعی</h3>
              <div className="flex space-x-4">
                
                <a href="#" className="hover:scale-125 transition-transform duration-500">
                 <img src={Git} alt="GitHub" />
                </a>
                <a href="#" className="hover:scale-125 transition-transform duration-500">
                <img src={instagram} alt="instagram"></img>
                </a>
                <a href="#" className="hover:scale-125 transition-transform duration-500">
                <img src={linkedin} alt="linkedin"></img>
                </a>
                <a href="#" className="hover:scale-125  transition-transform duration-500">
                <img src={telegram} alt="telegram"></img>
                </a>
                
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="mt-12 pt-8 border-t border-white/20 text-center text-white/60 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <p>© {new Date().getFullYear()} انجمن علمی کامپیوتر. تمامی حقوق محفوظ است.</p>
            <br/>
            <p  className='text-xs'>Developed by Δlι</p>

          </motion.div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;