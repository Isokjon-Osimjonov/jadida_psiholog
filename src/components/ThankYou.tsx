import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { FaCheckCircle, FaHeart } from 'react-icons/fa';

interface ThankYouProps {
  onReturnHome: () => void;
}

export const ThankYou: React.FC<ThankYouProps> = ({ onReturnHome }) => {
  return (
    <div className='bg-white min-h-screen w-full flex items-center justify-center px-4'>
      <div className='max-w-2xl mx-auto w-full'>
        <Card className='bg-[#379286] rounded-2xl sm:rounded-3xl border-none p-6 sm:p-8 lg:p-12 text-center'>
          <CardContent className='p-0'>
            {/* Success Icon */}
            <div className='flex justify-center mb-6 sm:mb-8'>
              <div className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/20 rounded-full flex items-center justify-center'>
                <FaCheckCircle className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white' />
              </div>
            </div>

            {/* Main Title */}
            <h1 className='text-white font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6'>
              Rahmat!
            </h1>

            {/* Subtitle with heart icon */}
            <div className='flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8'>
              <FaHeart className='w-5 h-5 sm:w-6 sm:h-6 text-rose-300' />
              <h2 className='text-white font-medium text-xl sm:text-2xl lg:text-3xl'>
                Muvaffaqiyatli yuborildi
              </h2>
              <FaHeart className='w-5 h-5 sm:w-6 sm:h-6 text-rose-300' />
            </div>

            {/* Description */}
            <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10 border border-white/20'>
              <p className='text-white text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed'>
                Sizning ma'lumotlaringiz muvaffaqiyatli qabul qilindi. 
                <br className='hidden sm:block' />
                Tez orada mutaxassis siz bilan bog'lanadi va 
                <br className='hidden sm:block' />
                bepul konsultatsiya vaqtini belgilaydi.
              </p>
            </div>

            {/* Additional Info */}
            <div className='bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-8 sm:mb-10 border border-white/10'>
              <p className='text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed'>
                <span className='font-semibold'>Eslatma:</span> Agar 24 soat ichida javob olmagan bo'lsangiz, 
                iltimos spam papkangizni tekshiring yoki to'g\'ridan-to'g\'ri bizga qo'ng\'iroq qiling.
              </p>
            </div>

            {/* Return Button */}
            <Button
              onClick={onReturnHome}
              className='w-full sm:w-auto min-w-[200px] h-12 sm:h-14 lg:h-16 bg-white hover:bg-white/90 text-[#379286] font-bold text-lg sm:text-xl lg:text-2xl rounded-2xl px-8 sm:px-12 transition-all duration-300 hover:scale-105'
            >
              Bosh sahifaga qaytish
            </Button>

            {/* Decorative Elements */}
            <div className='flex justify-center items-center gap-2 mt-8 sm:mt-10'>
              <div className='w-2 h-2 bg-white/30 rounded-full'></div>
              <div className='w-3 h-3 bg-white/50 rounded-full'></div>
              <div className='w-2 h-2 bg-white/30 rounded-full'></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};