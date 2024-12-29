'use client';
import { createClient } from '@/lib/supabase/client';
import Container from '@/components/Container';
import { useEffect, useState } from 'react';
import { Trainer } from '@/types/Trainer';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn, formatPhoneNumber, slugify } from '@/lib/utils';
import {
  EarthIcon,
  Facebook,
  Instagram,
  MailIcon,
  PhoneIcon
} from 'lucide-react';
import Star from '../../../../public/svg/star.svg';
import Image from 'next/image';
import Notification from '@/components/Notification';

const TrainerPage = ({ slug }: { slug: string }) => {
  // supabase
  const supabase = createClient();

  // state
  const [trainer, setTrainer] = useState<Trainer>();
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState([]);
  const SUPABASE_CDN = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/`;

  useEffect(() => {
    const getTrainerData = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error)
        Notification({
          type: 'Error',
          title: 'Błąd',
          description: 'Wystąpił błąd podczas pobiearnia'
        });

      if (data) {
        setTrainer(data);
        getImages(data.id);

        setLoading(false);
      }
    };

    const getImages = async (id: number) => {
      const { data, error } = await supabase.storage
        .from('gallery')
        .list(`${slug}_${id}/`, {
          offset: 0,
          sortBy: { column: 'name', order: 'desc' }
        });

      if (error) {
        console.log(error);
      }

      if (data) {
        setGallery(data);
      }
    };

    getTrainerData();
  }, [supabase, slug]);

  if (loading) {
    return (
      <Container className="space-y-2" width="max-w-4xl">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </Container>
    );
  }

  return (
    <Container className="rounded-xl flex gap-6 flex-col md:max-w-4xl lg:max-w-3xl mb-10">
      <div id="trainer_picture" className="flex items-center gap-5 flex-wrap">
        <Skeleton
          className={cn(
            'w-[130px] h-[130px] animate-none rounded-full',
            trainer?.is_pro && 'ring-2 ring-offset-2 ring-trenerBlue'
          )}
        />
        <div className="space-y-1">
          {trainer?.is_pro && <Button>Polecany trener</Button>}
          <h1 className="font-semibold text-xl">{trainer?.full_name}</h1>
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
        <div className="flex flex-col md:text-sm w-full md:w-auto md:ml-auto space-y-1 bg-white md:bg-transparent p-5 md:p-0 rounded-xl border md:border-none">
          {trainer?.phone && (
            <div className="flex gap-2 items-center">
              <PhoneIcon width={20} />
              <a
                href={`tel:${trainer?.phone}`}
                className="font-medium hover:underline underline-offset-2 hover:text-trenerBlue"
              >
                {formatPhoneNumber(trainer?.phone || '')}
              </a>
            </div>
          )}
          {trainer?.email && (
            <div className="flex gap-2 items-center">
              <MailIcon width={20} />
              <a
                href={`mailto:${trainer?.email}`}
                className="font-medium hover:underline underline-offset-2 hover:text-trenerBlue"
              >
                {trainer?.email}
              </a>
            </div>
          )}
          {trainer?.instagram && (
            <div className="flex gap-2 items-center">
              <Instagram width={20} />
              <a
                href={`https://instagram.com/${trainer?.instagram}`}
                className="font-medium hover:underline underline-offset-2 hover:text-trenerBlue"
              >
                Instagram
              </a>
            </div>
          )}
          {trainer?.facebook && (
            <div className="flex gap-2 items-center">
              <Facebook width={20} />
              <a
                href={`${trainer?.facebook}`}
                className="font-medium hover:underline underline-offset-2 hover:text-trenerBlue"
              >
                Facebook
              </a>
            </div>
          )}
          {trainer?.www && (
            <div className="flex gap-2 items-center">
              <EarthIcon width={20} />
              <a
                href={`${trainer?.www}`}
                className="font-medium hover:underline underline-offset-2 hover:text-trenerBlue"
              >
                Strona WWW
              </a>
            </div>
          )}
        </div>
      </div>

      <div id="trainer_about" className="bg-white p-5 md:p-8 rounded-xl border">
        <h2 className="text-lg font-semibold mb-5">O mnie</h2>
        {trainer?.about ? (
          <div dangerouslySetInnerHTML={{ __html: trainer?.about || '' }} />
        ) : (
          <p>Brak opisu :(</p>
        )}
      </div>

      <div
        id="trainer_training_info"
        className="bg-white p-5 md:p-8 rounded-xl border"
      >
        <h2 className="text-lg font-semibold mb-5">Informacje treningowe</h2>

        <div className="flex flex-col md:flex-row gap-3">
          {trainer?.price && (
            <div className="flex flex-col gap-1 text-sm">
              <p className="text-gray-600">Cena za godzinę</p>
              <p className="text-base font-medium">{trainer?.price} zł</p>
            </div>
          )}

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

      <div
        id="trainer_specializations"
        className="bg-white p-5 md:p-8 rounded-xl border"
      >
        <h2 className="text-lg font-semibold mb-5">Specjalizacje</h2>
        {trainer?.specializations ? (
          <div className="flex flex-wrap gap-2 cursor-">
            {JSON.parse(trainer?.specializations).map((spec: string) => (
              <Button variant="spec_btn" key={spec}>
                {spec}
              </Button>
            ))}
          </div>
        ) : (
          'Brak specjalizacji :('
        )}
      </div>

      <div
        id="trainer_gallery"
        className="bg-white p-5 md:p-8 rounded-xl border"
      >
        <h2 className="text-lg font-semibold mb-5">Galeria zdjęć</h2>

        <div>
          {gallery && gallery.length > 0
            ? gallery?.map((image, index) => {
                return (
                  <Image
                    key={index}
                    src={`${SUPABASE_CDN}/${slug}_${trainer?.id}/${image.name}`}
                    alt={image.name}
                    width={162}
                    height={240}
                    className="rounded-xl"
                  />
                );
              })
            : 'Brak zdjęć'}
        </div>
      </div>
    </Container>
  );
};

export default TrainerPage;
