import Image from 'next/image';
import Location from '../../public/svg/location.svg';
import Find from '../../public/svg/find.svg';
import Handshake from '../../public/svg/handshake.svg';
import { Card } from './ui/card';
import Container from './Container';

type FeaturesProps = {
  id: number;
  icon: string;
  title: string;
  text: string;
};

const features: FeaturesProps[] = [
  {
    id: 1,
    icon: Location,
    title: 'Wpisz swoje miasto',
    text: 'Chcemy aby w każdym mieście w Polsce byli chętni do pomocy trenerzy personalni.'
  },
  {
    id: 2,
    icon: Find,
    title: 'Znajdź trenera',
    text: 'Wybierz spośród ponad 2000 trenerów. Przeglądaj opinie innych trenujących.'
  },
  {
    id: 3,
    icon: Handshake,
    title: 'Nawiąż współpracę',
    text: 'Znalazłeś trenera? Super! Ustalcie warunki współpracy i razem pracujcie nad formą!'
  }
];

const HeroFeatures = () => {
  return (
    <Container className="mt-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map(({ id, icon, title, text }) => (
          <Card
            key={id}
            className="md:p-7 border-none shadow-none md:bg-[#FBFCFF]"
          >
            <div className="flex flex-col md:justify-center md:items-center md:px-10">
              <header className="flex md:flex-col items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <Image src={icon} alt={title} />
                <h2 className="font-medium md:text-lg">{title}</h2>
              </header>
              <p className="md:text-center text-slate-500">{text}</p>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default HeroFeatures;
