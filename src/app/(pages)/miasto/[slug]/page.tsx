'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

const CityPage = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );

  const getCity = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('city', params.slug);

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
  }, []); // fix?

  if (loading) {
    return (
      <section className="px-5 max-w-6xl mx-auto">
        <Skeleton className="h-20 w-full" />
      </section>
    );
  }

  return (
    <section className="px-5 max-w-6xl mx-auto">
      <h1 className="text-4xl font-semibold">
        Trenerzy personalni {trainers[0].location}
      </h1>

      {trainers &&
        trainers.map((trener, index) => (
          <div key={index}>
            <p>{trener.full_name}</p>
          </div>
        ))}
    </section>
  );
};

export default CityPage;
