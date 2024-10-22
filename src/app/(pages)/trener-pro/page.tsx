import { cn } from '@/lib/utils';
import React from 'react';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Trener PRO'
};

const pro_features = [
  {
    id: 1,
    title: 'Wyróżnienie na stronie miasta',
    description: 'Twój profil będzie na samej górze wyników na stronie miasta',
    disabled: false
  },
  {
    id: 2,
    title: 'Promocja w social media',
    description:
      'Opis Twoich usług oraz zdjęcia będą promowane w social mediach',
    disabled: false
  },
  {
    id: 3,
    title: 'Opinie',
    description: 'Użytkownicy mogą wystawić opinie na temat współpracy z Tobą',
    disabled: false
  },
  {
    id: 4,
    title: 'Więcej specjalizacji',
    description: 'Twój profil będzie na samej górze wyników na stronie miasta',
    disabled: false
  },
  {
    id: 5,
    title: 'Galeria +',
    description: 'Dodawaj zdjęcia "przed / po" i pokaż efekty swojej pracy',
    disabled: false
  },
  {
    id: 6,
    title: 'Wiadomości prywatne',
    description: 'Funkcja dostępna wkrótce',
    disabled: true
  },
  {
    id: 7,
    title: 'Tworzenie planów treningowych',
    description: 'Funkcja dostępna wkrótce',
    disabled: true
  },
  {
    id: 8,
    title: 'Raporty',
    description: 'Funkcja dostępna wkrótce',
    disabled: true
  }
];

//  todo add easy cart integration

const TrenerPRO = () => {
  return (
    <section className="max-w-6xl mx-auto px-5 mt-10 my-20">
      <h1 className="text-3xl font-semibold">Trener PRO</h1>

      <div className="grid grid-col1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-3 mt-10">
        {pro_features.map((feature) => (
          <FeatureCard key={feature.id} {...feature} />
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center">
        <div>
          <p className="text-sm font-medium">Tylko</p>
          <p className="text-4xl font-bold">19,99 zł</p>
        </div>
        <Button className="mt-5 font-medium" variant="defaultTrener">
          Wyróżnij swój profil
        </Button>
      </div>
    </section>
  );
};

export default TrenerPRO;

type FeatureCardProps = {
  id: number;
  title: string;
  description: string;
  disabled: boolean;
};

const FeatureCard = ({
  id,
  disabled,
  title,
  description
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        'p-7 hover:bg-slate-100 rounded-xl flex flex-col justify-between cursor-pointer',
        disabled && 'text-zinc-400 opacity-40 hover:bg-transparent',
        id === 1 && 'bg-trenerBlue text-white hover:bg-trenerBlue/90'
      )}
    >
      <div className="flex flex-col gap-5">
        <p
          className={cn(
            'text-trenerBlue text-sm font-semibold',
            id === 1 && 'text-white'
          )}
        >
          PRO / {id}
        </p>
        <h2 className="text-3xl leading-9 font-medium">{title}</h2>
      </div>
      <p className="mt-4 text-lg">{description}</p>
    </div>
  );
};
