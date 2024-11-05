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
  EarthIcon,
  Facebook,
  Instagram,
  MailIcon,
  PhoneIcon,
  TriangleAlert
} from 'lucide-react';
import Star from '../../../../public/svg/star.svg';
import Image from 'next/image';

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
      <Container className="rounded-xl flex gap-10 flex-col" width="max-w-5xl">
        <div id="trainer_picture" className="flex items-center gap-5">
          <Skeleton className="w-[130px] h-[130px] animate-none rounded-full ring-2 ring-offset-2 ring-trenerBlue" />
          <div className="space-y-1">
            {trainer?.is_pro && <Button>Polecany trener</Button>}
            <h1 className="font-semibold text-lg">{trainer?.full_name}</h1>
            <p className="text-sm">Trener personalny {trainer?.location}</p>
            {trainer?.is_pro && (
              <div className="flex gap-2 items-center">
                <div className="flex gap-1">
                  <Image src={Star} alt="Ocena" />
                  <Image src={Star} alt="Ocena" />
                  <Image src={Star} alt="Ocena" />
                  <Image src={Star} alt="Ocena" />
                  <Image src={Star} alt="Ocena" />
                </div>
                <p className="text-sm">(3 oceny)</p>
              </div>
            )}
          </div>
        </div>

        <div id="trainer_about">
          <h2 className="text-lg font-semibold mb-3">O mnie</h2>
          {trainer?.about ? (
            <div dangerouslySetInnerHTML={{ __html: trainer?.about || '' }} />
          ) : (
            <p>Brak opisu :(</p>
          )}
        </div>

        <div id="trainer_specializations">
          <h2 className="text-lg font-semibold mb-3">Specjalizacje</h2>
          {trainer?.specializations ? (
            <div className="flex flex-wrap gap-2">
              {JSON.parse(trainer?.specializations).map((spec: string) => (
                <Button variant="outline" key={spec}>
                  {spec}
                </Button>
              ))}
            </div>
          ) : (
            'Brak specjalizacji :('
          )}
        </div>

        <header className="flex flex-col md:flex-row md:gap-10 lg:gap-14 min-w-[300px] md:items-center ">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:gap-10 lg:gap-14 md:justify-center">
              <div className="flex flex-col md:gap-1">
                <div className="flex gap-1 text-sm items-center">
                  <PhoneIcon width={20} />
                  <a href={`tel:${trainer?.phone}`} className="font-medium">
                    {trainer?.phone}
                  </a>
                </div>
                <div className="flex gap-1 text-sm items-center">
                  <MailIcon width={20} />
                  <a href={`mailto:${trainer?.email}`} className="font-medium">
                    {trainer?.email}
                  </a>
                </div>
              </div>

              <div className="flex flex-col md:gap-1">
                <div className="flex gap-1 text-sm items-center">
                  <Instagram width={20} />
                  <a href={`${trainer?.instagram}`} className="font-medium">
                    {trainer?.instagram}
                  </a>
                </div>
                <div className="flex gap-1 text-sm items-center">
                  <Facebook width={20} />
                  <a href={`${trainer?.facebook}`} className="font-medium">
                    facebook
                  </a>
                </div>
                <div className="flex gap-1 text-sm items-center">
                  <EarthIcon width={20} />
                  <a href={`${trainer?.www}`} className="font-medium">
                    www
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
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
          </div>
        </header>

        <div className="">
          <h2 className="font-medium">O mnie</h2>
        </div>
      </Container>
    );
  }
};

export default TrainerPage;
