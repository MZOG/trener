'use client';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import IconCity from '../../public/svg/icon_city.svg';
import IconTrainer from '../../public/svg/icon_trainer.svg';
import IconContact from '../../public/svg/icon_contact.svg';
import TrainerImage1 from '../../public/images/features_1.jpg';
import TrainerImage2 from '../../public/images/features_2.jpg';
import TrainerImage3 from '../../public/images/features_3.jpg';

type FeaturesProps = {
  id: number;
  icon: string;
  img: string | StaticImageData;
  title: string;
  text: string;
};

const features: FeaturesProps[] = [
  {
    id: 1,
    icon: IconCity,
    img: TrainerImage1,
    title: 'Wpisz swoje miasto',
    text: 'Chcemy aby w każdym mieście w Polsce byli chętni do pomocy trenerzy personalni.'
  },
  {
    id: 2,
    icon: IconTrainer,
    img: TrainerImage2,
    title: 'Znajdź trenera',
    text: 'Wybierz spośród ponad 2000 trenerów. Przeglądaj opinie innych trenujących.'
  },
  {
    id: 3,
    icon: IconContact,
    img: TrainerImage3,
    title: 'Nawiąż współpracę',
    text: 'Znalazłeś trenera? Super! Ustalcie warunki współpracy i razem pracujcie nad formą!'
  }
];

const HeroFeatures = () => {
  return (
    <section className="container mx-auto mb-20 px-5">
      <div className="flex justify-center gap-5">
        {features.map(({ id, icon, img, title, text }) => (
          <div key={id} className="relative">
            <Image src={img} alt={title} />
            <div className="absolute bottom-10 left-10">
              <header className="flex flex-col gap-3 mb-4">
                <Image src={icon} alt={title} />
                <h2 className="font-medium text-white text-lg">{title}</h2>
              </header>
              <p className="text-white max-w-[230px]">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroFeatures;
