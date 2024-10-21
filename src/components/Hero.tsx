import Image from 'next/image';
import HeroImage from '../../public/svg/hero_image.svg';

// components
import CitySearch from './CitySearch';
import PopularCities from './PopularCities';

const Hero = () => {
  return (
    <section className="max-w-6xl mx-auto px-5 flex gap-10 items-center justify-between pb-[100px]">
      <div className="space-y-5">
        <h1 className="text-5xl font-medium max-w-[480px]">
          Znajdź swojego trenera personalnego
        </h1>
        <p className="text-lg text-slate-800">
          Wpisz swoje miasto, aby wyszukać trenerów
        </p>

        <CitySearch />
        <PopularCities />
      </div>

      <Image src={HeroImage} alt="Znajdź swojego trenera personalnego" />
    </section>
  );
};

export default Hero;
