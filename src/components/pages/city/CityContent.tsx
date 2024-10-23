'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import { Trainer } from '@/types/Trainer';
import { createClient } from '@/lib/supabase/client';
import Container from '@/components/Container';

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
      setTrainers(data); // type this
      setLoading(false);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCity();
  });

  if (loading) {
    return (
      <section className="px-5 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <Skeleton className="h-60 w-full" />
        <Skeleton className="h-60 w-full" />
        <Skeleton className="h-60 w-full" />
      </section>
    );
  }

  return (
    <Container>
      <>
        <h1 className="text-4xl font-semibold">
          Trenerzy personalni {trainers && trainers[0].location}
        </h1>

        {trainers &&
          trainers.map((trener, index) => (
            <div key={index}>
              <p>{trener.full_name}</p>
            </div>
          ))}
      </>
    </Container>
  );
};

export default CityContent;
