'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import { Trainer } from '@/types/Trainer';
import { createClient } from '@/lib/supabase/client';
import Container from '@/components/Container';
import TrainerCard from '@/components/TrainerCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const CityContent = ({ slug }: { slug: string }) => {
  const [loading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState<Trainer[]>();
  const [filteredTrainers, setFilteredTrainers] = useState<Trainer[]>();

  const [isFemaleFilter, setIsFemaleFilter] = useState(false);

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

  const resetFilters = () => {
    setFilteredTrainers(null);
    setIsFemaleFilter(false);
  };

  const handleIsFemale = (e) => {
    setIsFemaleFilter(e);
    const isFemaleTrainers = trainers?.filter((trainer) => {
      if (trainer.is_female === e) {
        return trainer;
      }
    });
    setFilteredTrainers(isFemaleTrainers);
  };

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
          <aside className="min-w-[200px] space-y-4 bg-white self-start border rounded-xl p-5">
            <p className="text-sm font-semibold">Filtry</p>

            <div className="flex items-center space-x-2">
              <Switch
                id="airplane-mode"
                checked={isFemaleFilter}
                onCheckedChange={handleIsFemale}
              />
              <Label htmlFor="airplane-mode">Tylko kobiety</Label>
            </div>

            <p className="text-xs text-gray-400">Więcej filtrów wkrótce</p>

            <div className="flex gap-2">
              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </aside>
          <div className="grid grid-cols-3 gap-5">
            {filteredTrainers
              ? filteredTrainers.map((trener, index) => (
                  <TrainerCard trainer={trener} key={index} />
                ))
              : trainers?.map((trener, index) => (
                  <TrainerCard trainer={trener} key={index} />
                ))}
          </div>
        </div>
      </>
    </Container>
  );
};

export default CityContent;
