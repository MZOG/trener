'use client';
import { useState, useEffect } from 'react';
import { Trainer } from '@/types/Trainer';
import { createClient } from '@/lib/supabase/client';
import Container from '@/components/Container';
import CitySearch from '@/components/CitySearch';
import TrainerCard from '@/components/trainer/TrainerCard';
import CityFilters from './CityFilters';
import { FiltersProps } from '@/types/Filters';
import { cn } from '@/lib/utils';
const CityContent = ({ slug }: { slug: string }) => {
  const [loading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState<Trainer[]>();
  const [filteredTrainers, setFilteredTrainers] = useState<Trainer[]>([]);
  const [featuredTrainers, setFeaturedTrainers] = useState<Trainer[]>([]);

  // filters
  const [filters, setFilters] = useState<FiltersProps>({
    price: null,
    womanOnly: null,
    specializations: null,
    online: null,
    dietPlan: null
  });
  const handleFilters = (data: FiltersProps) => {
    setFilters(data);
  };

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
        // other filters here
        const matchWomanOnly =
          !filters.womanOnly || trainer.is_female === filters.womanOnly;
        const matchOnline =
          !filters.online || trainer.work_online === filters.online;
        const matchDietPlan =
          !filters.dietPlan || trainer.diet_plan === filters.dietPlan;
        return (
          !trainer.is_pro && matchWomanOnly && matchOnline && matchDietPlan
        );
      });

      // sort trainers by date here
      const sorted = filtered.sort((a, b) => {
        return (
          new Date(b.created_at as string).getTime() -
          new Date(a.created_at as string).getTime()
        );
      });

      setFilteredTrainers(sorted);
    }

    return;
  }, [trainers, filters]);

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
          <CityFilters handleFilters={handleFilters} />

          <div
            className={cn(
              'col-span-9',
              featuredTrainers.length > 0 && 'space-y-5'
            )}
          >
            {featuredTrainers && (
              <div className="grid grid-cols-3 gap-5">
                {featuredTrainers?.map((trener, index) => (
                  <TrainerCard trainer={trener} key={index} />
                ))}
              </div>
            )}
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
