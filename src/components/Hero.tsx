import Image from 'next/image';
import HeroImage from '../../public/svg/hero_image.svg';

// components
import CitySearch from './CitySearch';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="max-w-6xl mx-auto px-5 flex gap-10 items-center justify-between pb-20">
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

const PopularCities = () => {
  const cities = [
    { name: 'Warszawa', href: '/miasto/warszawa' },
    { name: 'Poznań', href: '/miasto/poznan' },
    { name: 'Katowice', href: '/miasto/katowice' },
    { name: 'Gdańsk', href: '/miasto/gdansk' },
    { name: 'Wrocław', href: '/miasto/wroclaw' },
    { name: 'Kraków', href: '/miasto/krakow' }
  ];
  return (
    <div>
      <p className="text-xs text-slate-800">Popularne miasta:</p>
      <ul className="flex gap-5 mt-1">
        {cities.map((city, index) => (
          <li key={index} className="text-sm">
            <Link
              href={city.href}
              className="hover:underline underline-offset-2"
            >
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hero;
