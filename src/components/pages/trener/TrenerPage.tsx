'use client';
import { createClient } from '@/lib/supabase/client';
import Container from '@/components/Container';
import { useEffect, useState } from 'react';
import { Trainer } from '@/types/Trainer';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { formatPhoneNumber } from '@/lib/utils';
// icons
import {
  Facebook,
  Instagram,
  MailIcon,
  PhoneIcon,
  TriangleAlert
} from 'lucide-react';

const TrainerPage = ({ slug }: { slug: string }) => {
  // supabase
  const supabase = createClient();

  // state
  const [trainer, setTrainer] = useState<Trainer>();
  const [loading, setLoading] = useState(true);

  const getTrainerData = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      setTrainer(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrainerData();
  }, []);

  if (loading) {
    return (
      <Container className="space-y-2" width="max-w-4xl">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </Container>
    );
  } else {
    return (
      <Container
        className="bg-white p-5 rounded-xl border border-[#E9EFFF] flex gap-10"
        width="max-w-5xl"
      >
        <header className="flex flex-col md:flex-row md:gap-10 min-w-[300px] md:w-auto">
          <div id="trainer_picture" className="relative">
            <Skeleton className="w-[150px] h-[150px] rounded-full" />
            <Button className="absolute -bottom-5">Polecany trener</Button>
          </div>

          <div>
            <h1 className="mt-7 font-medium text-lg">{trainer?.full_name}</h1>
            <p className="text-sm">Trener personalny {trainer?.location}</p>
            <p className="text-sm">stars (3 oceny)</p>
          </div>

          <div className="mt-4 space-y-1">
            <div className="flex gap-1 text-sm items-center">
              <PhoneIcon width={20} />
              {trainer?.phone}
            </div>
            <div className="flex gap-1 text-sm items-center">
              <MailIcon width={20} />
              {trainer?.email}
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <div className="flex gap-1 text-sm items-center">
              <Instagram width={20} />
              instagram
            </div>
            <div className="flex gap-1 text-sm items-center">
              <Facebook width={20} />
              facebook
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <div className="flex flex-col gap-1 text-sm">
              <p className="text-gray-600">Cena za godzinę</p>
              <p className="text-base font-medium">{trainer?.price} zł</p>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <p className="text-gray-600">Prowadzenie online</p>
              <p className="text-base font-medium">
                {trainer?.work_online ? 'Tak' : 'Nie'}
              </p>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <p className="text-gray-600">Plan dietetyczny</p>
              <p className="text-base font-medium">
                {trainer?.diet_plan ? 'Tak' : 'Nie'}
              </p>
            </div>
          </div>
        </header>
      </Container>
    );
  }
};

export default TrainerPage;
