import Image from 'next/image';
import IconCity from '../../public/svg/icon_city.svg';
import IconTrainer from '../../public/svg/icon_trainer.svg';
import IconContact from '../../public/svg/icon_contact.svg';
import IconFree from '../../public/svg/icon_free.svg';

type FeaturesProps = {
  id: number;
  icon: string;
  title: string;
  text: string;
};

const features: FeaturesProps[] = [
  {
    id: 1,
    icon: IconCity,
    title: 'Wpisz swoje miasto',
    text: 'Chcemy aby w każdym mieście w Polsce byli chętni do pomocy trenerzy personalni.'
  },
  {
    id: 2,
    icon: IconTrainer,
    title: 'Znajdź trenera',
    text: 'Wybierz spośród ponad 2000 trenerów. Przeglądaj opinie innych trenujących.'
  },
  {
    id: 3,
    icon: IconContact,
    title: 'Nawiąż współpracę',
    text: 'Znalazłeś trenera? Super! Ustalcie warunki współpracy i razem pracujcie nad formą!'
  },
  {
    id: 4,
    icon: IconFree,
    title: 'Bezpłatna wyszukiwarka',
    text: 'Korzystanie z serwisu Trener Personalny jest bezpłatne dla szukających trenera.'
  }
];

const HeroFeatures = () => {
  return (
    <section className="max-w-6xl mx-auto my-20 px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
        {features.map(({ id, icon, title, text }) => (
          <div key={id}>
            <header className="flex gap-3 items-center mb-4">
              <Image src={icon} alt={title} />
              <h2 className="font-medium">{title}</h2>
            </header>
            <p className="text-slate-800 max-w-[230px]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroFeatures;
