import React from 'react';
import { useState } from 'react';
import { FaCheckCircle, FaShieldAlt, FaComments } from 'react-icons/fa';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const problemCards = [
  {
    number: '1',
    text: "Erim yonimda bo'lsa ham, o'zimni yolg'iz his qilaman.",
  },
  {
    number: '2',
    text: "Gapirsam eshitmaydi yoki so'kib beradi.\nQadrim yo'q, gapimni hisobga olmaydi.",
  },
  {
    number: '3',
    text: "Qaynonam bizni urishtirib qo'yyapti.\nHar narsaga qaynonam aralashadi.",
  },
  {
    number: '4',
    text: "Jinsiy yaqinlik kamayib ketdi.\nErim meni xohlashdan to‘xtadi shekilli.",
  },
];

const consultationBenefits = [
  {
    text: 'Sizni yillar davomida qiynab kelayotgan muammoning asl ildizini ochamiz.',
  },
  {
    text: '"Nega men shunday og\'riqda yashayapman?" degan savolga aniq javob olasiz.',
  },
  {
    text: "Hayotingizni o'zgartirish uchun birinchi amaliy qadamni qo'lingizga olasiz.",
  },
];

const expectedResults = [
  {
    title: "Qo'rquv o'rniga xotirjamlik:",
    description: "eringiz bilan suhbatingiz tinch va aniq bo'ladi.",
  },
  {
    title: 'Janjallarni boshqarish:',
    description: "qaynonangiz bilan ziddiyatlarni sokin yo'l bilan hal qila olasiz.",
  },
  {
    title: 'Ishonchni tiklash:',
    description: 'xiyonat soyasidan chiqib, qadriyatlaringizni qayta tiklaysiz.',
  },
  {
    title: 'Mehribon tarbiya:',
    description: "bolalarga baqirish o'rniga sokin, barqaror muloqot yo'lga qo'yiladi.",
  },
  {
    title: 'Iliqlikni qaytarish:',
    description: "sovuqlik asta-sekin o'rnini iliqlik va yaqinlikka bo'shatadi.",
  },
  {
    title: "Aniq yo'l xaritasi:",
    description: '14 kunlik reja bilan qaysi qadamni qachon tashlashni bilib borasiz.',
  },
];

const guaranteeItems = [
  {
    text: "Konsultatsiya sizga yo'l xaritasini beradi: qaysi tomonga yurishingiz, qanday qadam tashlashingiz kerakligini aniq ko'rasiz.",
  },
  {
    text: "Agar sizga bu narsani bera olmasam …To'lov qilgan pulingizni 100% qaytaraman. Menga shuni aytsangiz bo'lgani.",
  },
  {
    text: "Misol uchun maslaxatim, ovozim yoqmasa yoki aytadigan narsalarim o'rinli bo'lmasa ham. To'lov qilgan pulingizni 100% qaytaraman.",
  },
];

export const Desktop = (): JSX.Element => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 ',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Ensure +998 prefix is always present
      if (!value.startsWith('+998 ')) {
        return; // Don't allow changes that remove the prefix
      }
      // Only allow numbers and spaces after +998
      const phoneNumber = value.slice(5); // Remove '+998 ' prefix
      const cleanNumber = phoneNumber.replace(/[^\d\s]/g, '');
      const formattedValue = '+998 ' + cleanNumber;

      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const cursorPosition = input.selectionStart || 0;

    // Prevent deletion of +998 prefix
    if ((e.key === 'Backspace' || e.key === 'Delete') && cursorPosition <= 5) {
      e.preventDefault();
    }
  };

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    // Set cursor position after +998 prefix
    setTimeout(() => {
      if (input.value === '+998 ') {
        input.setSelectionRange(5, 5);
      }
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || formData.phone.trim() === '+998') {
      setSubmitMessage("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Replace this URL with your Pabbly Connect webhook URL
      const webhookUrl =
        'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY1MDYzMjA0MzQ1MjY5NTUzMDUxMzAi_pc';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          timestamp: new Date().toISOString(),
          source: 'Jadida Xusniddinovna Landing Page',
        }),
      });

      if (response.ok) {
        setSubmitMessage("Muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.");
        setFormData({ name: '', phone: '+998 ' });
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-white min-h-screen w-full'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        <section className='w-full mb-8 sm:mb-12 lg:mb-16 mt-4'>
          <div className='relative w-full h-[300px] sm:h-[300px] lg:h-[604px] bg-[#379286] rounded-2xl sm:rounded-3xl overflow-hidden'>
            <div className='flex flex-col justify-between h-full p-4 sm:p-6 lg:p-8 '>

              <div className='flex-1 flex flex-col justify-center px-2 sm:px-4 lg:px-8'>
                <h1 className='text-white font-medium text-2xl sm:text-3xl lg:text-4xl xl:text-5xl !leading-[1.3] tracking-wide  mb-4 sm:mb-6 lg:mb-8 text-center '>
                  Qanday qilib ajrashish yoqasiga {''}
                  <br className='hidden sm:block' />
                  kelib qolgan munosabatlaringizni {''}
                  <br className='hidden sm:block' />
                  qutqarib qolishingiz mumkin?
                </h1>

              
              </div>
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section className='mb-8 sm:mb-12 lg:mb-32'>
          <h2 className='text-[#369186] font-medium text-2xl sm:text-3xl lg:text-4xl text-center mb-8 sm:mb-12 px-4'>
            Pastda korsatib o'tgan holatim hozir juda ko'p. Sizda ham shunday oilaviy muammo bolsa, albatta yordam bera
            olaman.
          </h2>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12'>
            {problemCards.map((card, index) => (
              <Card key={index} className='bg-[#ade2d7] rounded-2xl border-none p-4 sm:p-6'>
                <CardContent className='p-0 flex items-start gap-4'>
                  <div className='w-12 h-12 sm:w-14 sm:h-14 bg-[#51b0a2] rounded-md flex items-center justify-center flex-shrink-0'>
                    <span className='font-bold text-white text-2xl sm:text-3xl'>{card.number}</span>
                  </div>
                  <p className='text-[#224d49] text-base sm:text-lg leading-relaxed whitespace-pre-line flex-1'>
                    {card.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className='bg-[#379286] rounded-2xl sm:rounded-3xl border-none p-6 sm:p-8 lg:p-12'>
            <CardContent className='p-0 text-center'>
              <p className='text-white font-medium text-xl sm:text-2xl lg:text-3xl leading-relaxed'>
                Sizda ham shunday <span className='text-rose-400'>oilaviy muammo bo'lsa</span> , bugun siz bilan bu
                muammoyingizga albatta <span className='text-rose-400'>yechim topamiz</span>.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Story Section */}
        <section className='mb-8 sm:mb-12 lg:mb-32'>
          <h2 className='text-[#369186] font-medium text-2xl sm:text-3xl lg:text-4xl text-center mb-8 sm:mb-12 px-4'>
            Keling avval aynan shu muammolar bilan oldimga kelgan bir ayolni hikoyasini aytib beraman.
          </h2>

          <Card className='rounded-2xl sm:rounded-3xl border border-[#224d49] p-6 sm:p-8 lg:p-12'>
            <CardContent className='p-0'>
              <p className='text-black font-light text-base sm:text-lg lg:text-xl xl:text-[22px] leading-relaxed'>
                Bugun yana kechasi soat uchgacha uxlamadim. Yonimda erimni nafasini eshityapman. Qanday qilib u bunday
                uxlay oladi? Men esa har kuni o'zimni yolg'iz va tushunarsiz his qilaman.
                <br />
                <br />U bugun ishdan juda kech keldi, lekin nega menga aytmadi? Yoki u boshqasini topdimi?
                <br />
                <br />
                Ba'zida u bilan bir xonada bo'lsak ham, bir yostiqqa bosh qo'yib uxlasak ham o'rtamizda katta devor
                bordek.
                <br />
                <br />
                Dugonamga telegramdan dardimni yozdim."Uni kechir yoki ket," dedi. Agar kechirsam o'zimni aldashim kerak
                bo'ladi, ketsam butun oilam buziladi.
                <br />
                <br />
                Ba'zida erimga qarab, bir paytlar sevgan insonimni ko'raman. Lekin oilamizdagi og'riqlar meni har kuni
                sindirib boryapti:
                <br />
                <br />
                -Yonma-yon yotamiz, lekin birga gaplashmaymiz.
                <br />
                -Qaynonaming har bir ayb topishi, tanbehi menga o'zimni qadrsiz va ojiza his qildiradi.
                <br />
                -Erim gapimni eshitmaydi, fikrimni tushunmaydi, gapirsam so'kib beradi.
                <br />
                -Eng og'iri esa xiyonat va gumon.
                <br />
                -Har bir telefon signali sms yuragimni tilka-pora qiladi.
                <br />
                -Bolalarimni bekordan-bekor urishib yuboraman. Aslida alamimni ulardan olaman. Keyin esa o'zimni yomon
                ko'rib yig'lab yuboraman.
                <br />
                <br />
                "Hammasi yaxshi" degan niqobni taqib yashashdan charchadim.
                <br />
                <br />
                Shu paytda oilaviy psixolog Jadida Xusniddinovnani uchratdim.
                <br />
                <br />
                Ular menga "unut" yoki "kechir" demadilar. Ular menga aniq rejani berdilar.
                <br />
                <br />
                Erim meni qadrlashni, e'tibor berishni boshladi har hafta dam olish kuni bolalarim bilan aylanishga olib
                chiqadigan bo'ldi.
                <br />
                <br />
                -O'zimni ayblashni to'xtatdim.
                <br />
                -O'zimni qadrsiz emas, kuchli ayol sifatida his qila boshladim.
                <br />
                -Muammoni ochiq ko'rib, undan chiqish yo'lini topdim.
                <br />
                -Bolalarimga baqirish o'rniga sokin va mehribon gapira boshladim.
                <br />
                -Uyimizda yana kulgi va suhbatlar paydo bo'ldi.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Invitation Section */}
        <Card className='bg-[#ade2d7] rounded-2xl sm:rounded-3xl border-none p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12 lg:mb-16'>
          <CardContent className='p-0 text-center'>
            <p className='text-[#224d49] font-medium text-lg sm:text-xl lg:text-2xl xl:text-[28px] leading-relaxed mb-4'>
              Yuqorida hikoya qilgan ayol ham xuddi shu og'riqlarda yashardi. Bu ayol bilan birga ishlaganimizdan so'ng
              u barcha muammolaridan qutildi, natijasini esa o'zingiz ko'rib turibsiz.
            </p>
            <p className='text-[#224d49] font-medium text-lg sm:text-xl lg:text-2xl xl:text-[28px] leading-relaxed'>
              <span className='font-medium'>Aynan shuning uchun men sizni ham shaxsiy onlayn </span>
              <span className='font-bold'>konsultatsiyamga taklif qilaman.</span>
            </p>
          </CardContent>
        </Card>

        {/* Consultation Benefits */}
        <section className='mb-8 sm:mb-12 lg:mb-32'>
          <h2 className='text-[#369186] font-medium text-2xl sm:text-3xl lg:text-4xl text-center mb-8 sm:mb-12 px-4'>
            Konsultatsiyamda siz quyidagilarni olasiz
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            {consultationBenefits.map((benefit, index) => (
              <Card key={index} className='bg-[#ade2d7] rounded-2xl border-none p-4 sm:p-6'>
                <CardContent className='p-0 flex items-start gap-4'>
                  <div className='w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#51b0a2] rounded-lg flex-shrink-0'>
                    <FaCheckCircle className='w-6 h-6 sm:w-8 sm:h-8 text-white' />
                  </div>
                  <p className='text-[#224d49] text-base sm:text-lg leading-relaxed flex-1'>{benefit.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Expected Results */}
        <section className='mb-8 sm:mb-12 lg:mb-32'>
          <h2 className='text-[#379286] font-medium text-2xl sm:text-3xl lg:text-4xl text-center mb-8 sm:mb-12 px-4'>
            Keyingi bosqichda siz kutishingiz mumkin bo'lgan natijalar
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            {expectedResults.map((result, index) => (
              <Card key={index} className='bg-[#ade2d7] rounded-2xl border-none p-4 sm:p-6'>
                <CardContent className='p-0 flex items-start gap-4'>
                  <div className='w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#51b0a2] rounded-lg flex-shrink-0'>
                    <FaCheckCircle className='w-6 h-6 sm:w-8 sm:h-8 text-white' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-[#224d49] text-base sm:text-lg lg:text-xl xl:text-[22px] leading-relaxed'>
                      <span className='font-bold'>
                        {result.title}
                        {result.title.includes(':') ? '' : ':'}
                        {result.title === 'Mehribon tarbiya:' || result.title === 'Iliqlikni qaytarish:' ? <br /> : ' '}
                      </span>
                      <span className='font-normal'>{result.description}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Guarantee Section */}
        <section className='mb-8 sm:mb-12 lg:mb-32'>
          <div className='relative'>
            {guaranteeItems.map((item, index) => (
              <Card key={index} className={`bg-[#ade2d7] rounded-2xl sm:rounded-3xl border-none p-6 sm:p-8 mb-6 `}>
                <CardContent className='p-0 flex items-start gap-4 sm:gap-6'>
                  <div className='w-12 h-12 sm:w-14 sm:h-14   lg:w-16  lg:h-16   flex items-center justify-center bg-[#51b0a2] rounded-lg flex-shrink-0'>
                    <FaShieldAlt className='w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white' />
                  </div>
                  <p className='text-[#224d49] text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed flex-1'>
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing */}
          <div className='text-center lg:pr-8 xl:pr-16 mt-8 sm:mt-20'>
            <p className='text-[#efa795] font-normal text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4 sm:mb-8'>
              Konsultatsiyaning asl narxi:
              <br />
              <span className='line-through'>1 200 000 so'm</span>
            </p>

            <p className='text-[#369186] font-normal text-2xl sm:text-3xl lg:text-4xl leading-tight'>
              <span className='font-normal'>Bugun esa sizda uni atigi </span>
              <br />
              <span className='font-bold'>499 ming</span>
              <br />
              <span className='font-normal'> so'mga olish imkoniyati bor!</span>
            </p>
          </div>
        </section>

        {/* Info Section */}
        <Card className='bg-[#379286] rounded-2xl sm:rounded-3xl border-none p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12'>
          <CardContent className='p-0 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 font-normal'>
            <div className='w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white/20 rounded-lg flex-shrink-0'>
              <FaComments className='w-8 h-8 sm:w-10 sm:h-10 text-white' />
            </div>
            <p className='text-white text-lg sm:text-xl lg:text-2xl xl:text-[28px] leading-relaxed flex-1'>
              Har kim ham bu imkoniyatdan foydalana olmaydi. Avval men siz bilan gaplashaman va muammoingizni tushunib
              chiqaman. Agar haqiqatan yordam bera olishimga ishonsam, keyin sizni <b>499 ming so'mga</b>{' '}
              konsultatsiyaga qo'shaman.
            </p>
          </CardContent>
        </Card>

        {/* Contact Form Section */}
        <Card className='bg-[#369186] rounded-2xl sm:rounded-3xl border-none p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12'>
          <CardContent className='p-0'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
              <div>
                <h2 className='text-white font-semibold text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6'>
                  Zanjirni uzish vaqti keldi
                </h2>
                <p className='text-white text-lg sm:text-xl lg:text-2xl leading-relaxed'>
                  Ismingiz va telefon raqamingizni yozib qoldiring birinchi suhbatimiz bepul bo'ladi.
                </p>
              </div>

              <div className='w-full max-w-md mx-auto lg:mx-0'>
                <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20'>
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                      <Label className='text-white text-base font-light mb-2 block'>Ismingiz</Label>
                      <Input
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        className='w-full h-12 sm:h-14 rounded-2xl border-none bg-white/10 backdrop-blur-sm text-white !placeholder-white focus:ring-2 focus:ring-white/30'
                        placeholder='Ismingizni yozing'
                        required
                        
                      />
                    </div>

                    <div>
                      <Label className='text-white text-base font-light mb-2 block'>Telefon raqamingiz</Label>
                      <Input
                        name='phone'
                        value={formData.phone}
                        onChange={handleInputChange}
                        onKeyDown={handlePhoneKeyDown}
                        onFocus={handlePhoneFocus}
                        className='w-full h-12 sm:h-14 rounded-2xl border-none bg-white/10 backdrop-blur-sm text-white !placeholder-white/60 focus:ring-2 focus:ring-white/30'
                        placeholder='+998 90 900 90 90'
                        required
                      />
                    </div>

                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full h-12 sm:h-14 bg-[#25C3B0] hover:bg-[#25C3B0]/70 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-white font-semibold text-lg sm:text-xl'
                    >
                      {isSubmitting ? 'Yuborilmoqda...' : "Jo'natish"}
                    </Button>

                    {submitMessage && (
                      <div
                        className={`text-center p-3 rounded-lg ${
                          submitMessage.includes('Muvaffaqiyatli')
                            ? 'bg-green-500/20 text-green-100'
                            : 'bg-red-500/20 text-red-100'
                        }`}
                      >
                        {submitMessage}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
