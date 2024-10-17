import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import Link from 'next/link';

const mockedTrainers = [
  {
    name: 'Marcin Zogrodnik',
    city: 'Katowice',
    href: '/trener/marcin-zogrodnik'
  },
  {
    name: 'Sebastian Jabłoński',
    city: 'Katowice',
    href: '/trener/marcin-zogrodnik'
  },
  {
    name: 'Daniel Świątkowski',
    city: 'Katowice',
    href: '/trener/marcin-zogrodnik'
  },
  {
    name: 'Janusz Kasztan',
    city: 'Katowice',
    href: '/trener/marcin-zogrodnik'
  }
];

const LatestTrainers = () => {
  return (
    <section className="mx-auto px-5 max-w-6xl py-20">
      <h2 className="text-xl">Niedawno dołączyli</h2>

      <Carousel className="mt-5">
        <CarouselContent>
          {mockedTrainers.map((trainer, index) => (
            <CarouselItem key={index} className="md:basis-1/3">
              <Link
                href={trainer.href}
                className="p-3 rounded-lg flex items-center gap-4 group border hover:border-trenerBlue"
              >
                <div className="size-14 rounded-full bg-gray-100"></div>
                <div>
                  <h3 className="group-hover:text-trenerBlue">
                    {trainer.name}
                  </h3>
                  <p className="text-sm text-slate-800">{trainer.city}</p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="border-none shadow-none" />
        <CarouselNext className="border-none shadow-none" />
      </Carousel>
    </section>
  );
};

export default LatestTrainers;
