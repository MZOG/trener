import { cn } from '@/lib/utils';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cennik'
};

const tick = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="mr-2 h-4 w-4"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const pro_features = [
  {
    id: 1,
    icon: tick,
    text: 'Wyróżnienie na stronie miasta',
    disabled: false
  },
  {
    id: 2,
    icon: tick,
    text: 'Promocja na instagramie',
    disabled: false
  },
  {
    id: 3,
    icon: tick,
    text: 'Opinie',
    disabled: false
  },
  {
    id: 4,
    icon: tick,
    text: 'Więcej specjalizacji',
    disabled: false
  },
  {
    id: 5,
    icon: tick,
    text: '10 zdjęć w galerii',
    disabled: false
  },
  {
    id: 6,
    icon: tick,
    text: 'Wiadomości prywatne',
    disabled: true
  },
  {
    id: 7,
    icon: tick,
    text: 'Tworzenie planów treningowych',
    disabled: true
  },
  {
    id: 8,
    icon: tick,
    text: 'Raporty',
    disabled: true
  }
];

const Pricing = () => {
  return (
    <section className="max-w-4xl mx-auto px-5 mt-10">
      <div className="grid bg-white w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h1 className="text-xl font-bold sm:text-2xl">Trener PRO</h1>
          <ul className="grid grid-cols-2 gap-5 text-[15px] font-medium sm:grid-cols-2">
            {pro_features.map((item) => (
              <li
                key={item.id}
                className={cn(
                  'relative flex items-center basis-1/2',
                  item.disabled && 'text-zinc-400'
                )}
              >
                {item.disabled && (
                  <p className="absolute -top-1 -right-3 text-[12px] bg-trenerBlue text-white font-medium px-1.5 rounded-full">
                    wkrótce
                  </p>
                )}
                {item.icon}
                <p className="inline-block">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h4 className="text-5xl font-bold">19,99 zł</h4>
            <p className="text-sm font-medium text-muted-foreground">
              Miesięcznie
            </p>
          </div>
          <a
            className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-md"
            href="/login"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
