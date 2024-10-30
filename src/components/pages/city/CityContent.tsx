'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import { Trainer } from '@/types/Trainer';
import { createClient } from '@/lib/supabase/client';
import Container from '@/components/Container';
import TrainerCard from '@/components/TrainerCard';

const CityContent = ({ slug }: { slug: string }) => {
  const [loading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState<Trainer[]>();

  const supabase = createClient();

  const getCity = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('city', slug);

    if (data) {
      setTrainers(data);
      setLoading(false);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCity();
  }, []);

  if (loading) {
    return (
      <section className="px-5 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </section>
    );
  }

  if (trainers?.length === 0) {
    return (
      <Container>
        <>
          <h1>Brak trenerów personalnych</h1>
          <p>Spróbuj wpisać miasto obok</p>
        </>
      </Container>
    );
  }

  return (
    <Container>
      <>
        <h1 className="text-4xl font-semibold">
          Trenerzy personalni {trainers && trainers[0]?.location}
        </h1>

        <div className="mt-20 grid grid-cols-4 gap-5">
          {trainers?.map((trener, index) => (
            <TrainerCard trainer={trener} key={index} />
          ))}
        </div>
      </>
    </Container>
  );
};

export default CityContent;
