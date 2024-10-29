'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import { Trainer } from '@/types/Trainer';
import { createClient } from '@/lib/supabase/client';
import Container from '@/components/Container';
import TrainerCard from '@/components/TrainerCard';
import { Button } from '@/components/ui/button';

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
      <section className="px-5 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
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

        <div className="mt-20 flex gap-10">
          <aside className="min-w-[200px]">
            <p className="text-sm font-semibold">Filtry</p>

            <p>tylko kobiety</p>
            <p>specjalizacje</p>

            <div className="flex gap-2">
              <Button variant="ghost">Resetuj</Button>
              <Button>Filtruj</Button>
            </div>
          </aside>
          <div className="grid grid-cols-3 gap-5">
            {trainers &&
              trainers.map((trener, index) => (
                <TrainerCard trainer={trener} key={index} />
              ))}
          </div>
        </div>
      </>
    </Container>
  );
};

export default CityContent;
