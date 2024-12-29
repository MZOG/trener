'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import { Trainer } from '@/types/Trainer';
import { createClient } from '@/lib/supabase/client';
import Container from '@/components/Container';
import CitySearch from '@/components/CitySearch';
import TrainerCard from '@/components/trainer/TrainerCard';

const CityContent = ({ slug }: { slug: string }) => {
  const [loading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState<Trainer[]>();
  const [filteredTrainers, setFilteredTrainers] = useState<Trainer[]>([]);
  const [featuredTrainers, setFeaturedTrainers] = useState<Trainer[]>([]);

  const supabase = createClient();

  useEffect(() => {
    const getCity = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('city', slug);

      if (data) {
        setTrainers(data);
        setLoading(false);

        const featuredTrainers = data?.filter((trainer) => trainer.is_pro);
        if (featuredTrainers.length > 0) {
          setFeaturedTrainers(featuredTrainers);
        } else {
          setFilteredTrainers(data);
        }
      }

      if (error) {
        console.log(error);
      }
    };

    getCity();
  }, [slug, supabase]);

  useEffect(() => {
    if (trainers) {
      const filtered = trainers?.filter((trainer) => {
        return !trainer.is_pro;
      });

      setFilteredTrainers([...featuredTrainers, ...filtered]);
    }

    return;
  }, [trainers]);

  if (loading) {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );
  }

  // If there are no trainers in the city
  if (trainers?.length === 0) {
    return (
      <Container className="max-w-md mx-auto">
        <div className="border rounded-md p-5 mb-10 text-center">
          <h1 className="text-xl font-medium">Brak trenerów personalnych ☹️</h1>
          <p>Spróbuj wpisać inne miasto</p>
        </div>

        <div className="max-w-md mx-auto flex items-center">
          <CitySearch />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <>
        <h1 className="text-4xl font-semibold">
          Trenerzy personalni {trainers && trainers[0]?.location}
        </h1>

        <div className="grid grid-cols-12 gap-5 mt-10">
          <aside className="col-span-3 border rounded-lg p-4">
            <p>Filtry</p>
          </aside>

          <div className="col-span-9">
            <div className="grid grid-cols-3 gap-5">
              {filteredTrainers?.map((trener, index) => (
                <TrainerCard trainer={trener} key={index} />
              ))}
            </div>
          </div>
        </div>
      </>
    </Container>
  );
};

export default CityContent;
