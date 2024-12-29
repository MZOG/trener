// components
import CitySearch from '../components/CitySearch';
import Container from './Container';
import Image from 'next/image';

const Hero = () => {
  return (
    <Container className="mt-5 md:mt-10 flex lg:gap-10 items-center">
      <div className="w-full md:w-6/12">
        <h1 className="mb-3">
          <span className="block text-md lg:text-xl text-slate-600 md:font-medium mb-2">
            Przeglądaj opinie, wybierz specjalizacje
          </span>
          <span className="text-2xl lg:text-5xl font-semibold leading-none">
            Znajdź trenera{' '}
            <span className="md:block">i umów się na trening</span>
          </span>
        </h1>
        <CitySearch />
      </div>
      <div className="lg:relative lg:w-6/12 lg:h-[540px]">
        <Image
          src="/images/hero_image.jpg"
          alt="Personal Trainer Background"
          fill
          style={{ objectFit: 'cover' }}
          className="lg:absolute lg:w-full lg:h-[540px] rounded-2xl hidden lg:block"
          priority
        />
      </div>
    </Container>
  );

  // return (
  //   <section className="max-w-6xl mt-14 mx-auto px-5 flex gap-5 items-center justify-between pb-[100px]">
  //     <div className="space-y-7">
  //       <HeroHeading />
  //       <CitySearch />
  //       <PopularCities />
  //     </div>
  //   </section>
  // );
};

export default Hero;
