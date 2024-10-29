import Image from 'next/image';
import HeroImage from '../../public/svg/hero_image.svg';
import dynamic from 'next/dynamic';

// components
import TrenerProLead from './TrenerProLead';
import CitySearch from '../components/CitySearch';
// const Search = dynamic(() => import('../components/CitySearch'), {
//   loading: () => <p>Loading...</p>
// });
const PopularCities = dynamic(() => import('../components/PopularCities'), {
  loading: () => <p>Loading...</p>
});

const Hero = () => {
  return (
    <section className="max-w-6xl mt-14 mx-auto px-5 flex gap-5 items-center justify-between pb-[100px]">
      <div className="space-y-7">
        <TrenerProLead />
        <HeroHeading />
        <HeroLead />
        <CitySearch />
        <PopularCities />
      </div>

      <Image src={HeroImage} alt="Znajdź swojego trenera personalnego" />
    </section>
  );
};

const HeroHeading = () => (
  <h1 className="text-5xl font-medium max-w-[490px]">
    Znajdź swojego <span className="text-trenerBlue">trenera personalnego</span>
  </h1>
);

const HeroLead = () => (
  <p className="text-xl text-slate-800">
    Wpisz swoje miasto, aby wyszukać trenerów
  </p>
);
export default Hero;
