// components
import CitySearch from '../components/CitySearch';
import Container from './Container';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-cyan-100 to-rose-200 min-h-[70vh] mt-5 mx-5 rounded-xl">
      <Container className="pt-40">
        <div className="flex flex-col gap-5 justify-center items-center">
          <h1 className="text-center">
            <span className="text-2xl lg:text-5xl font-semibold">
              Znajdź swojego
              <span className="md:block">trenera personalnego</span>
            </span>
          </h1>
          <p className="text-lg">
            Darmowa wyszukiwarka trenerów personalnych w Twoim mieście!
          </p>
          <div className="min-w-[400px]">
            <CitySearch />
          </div>
        </div>
      </Container>
    </div>
    // <Container className="mt-5 md:mt-10 flex lg:gap-10 items-center">
    //   <div className="w-full md:w-6/12">
    //     <h1 className="mb-3">
    //       <span className="block text-md lg:text-xl text-slate-600 md:font-medium mb-2">
    //         Przeglądaj opinie, wybierz specjalizacje
    //       </span>
    //       <span className="text-2xl lg:text-5xl font-semibold leading-none">
    //         Znajdź trenera{' '}
    //         <span className="md:block">i umów się na trening</span>
    //       </span>
    //     </h1>
    //     <CitySearch />
    //   </div>
    // </Container>
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
