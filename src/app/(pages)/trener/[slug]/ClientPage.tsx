'use client';
import { createClient } from '@/lib/supabase/client';
import Container from '@/components/Container';
import { useEffect, useState } from 'react';
import { Trainer } from '@/types/Trainer';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { formatPhoneNumber } from '@/lib/utils';
// icons
import { Facebook, Instagram, TriangleAlert } from 'lucide-react';

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
        className="bg-[#F5F9FF] px-6 py-10 rounded-xl border border-[#E9EFFF] flex gap-10"
        width="max-w-5xl"
      >
        <aside className="flex flex-col gap-5">
          <p>image</p>
          {trainer?.is_pro && <p>(pro) oceny</p>}
          <div>
            <h1 className="font-semibold text-lg">
              {trainer?.full_name || ''}
            </h1>
            <p className="text-sm">
              Trener personalny {trainer?.location ?? trainer?.location}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Numer telefonu</p>
            <a
              href={`tel:+48${trainer?.phone}`}
              className="font-medium hover:text-trenerBlue text-sm"
            >
              {trainer?.phone
                ? `+48 ${formatPhoneNumber(trainer?.phone)}`
                : '-'}
            </a>
          </div>
          <div>
            <p className="text-sm text-gray-600">E-mail</p>
            <a
              href={`mailto:${trainer?.email}`}
              className="font-medium hover:text-trenerBlue text-sm"
            >
              {trainer?.email ? trainer?.email : '-'}
            </a>
          </div>

          {trainer?.instagram && (
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5" />
              <a
                href={`https://instagram.com/${trainer?.instagram}`}
                className="font-medium hover:text-trenerBlue text-sm"
              >
                {trainer?.instagram}
              </a>
            </div>
          )}

          {trainer?.facebook && (
            <div className="flex items-center gap-2">
              <Facebook className="w-5 h-5" />
              <a
                href={`${trainer?.facebook}`}
                className="font-medium hover:text-trenerBlue text-sm"
              >
                Profil facebook
              </a>
            </div>
          )}

          {trainer?.is_pro && <p>(pro) ocen trenera</p>}

          <div className="flex items-center gap-2 mt-auto text-orange-700/60 hover:text-orange-700">
            <TriangleAlert className="w-4 h-4" />
            <p className="flex-end mt-auto text-sm font-medium">
              Zgłoś trenera
            </p>
          </div>
        </aside>

        <section className="space-y-5 flex-grow">
          <PanelCard title="O mnie">
            {trainer?.about ? (
              <div dangerouslySetInnerHTML={{ __html: trainer?.about || '' }} />
            ) : (
              <p>Brak opisu :(</p>
            )}
            <div className="border-t mt-5 pt-5 flex items-center gap-5">
              <div>
                <p className="text-sm text-gray-500">Cena za godzinę</p>
                <p className="font-medium">
                  {trainer?.price ? `${trainer?.price} zł / h` : '-'}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Prowadzenie online</p>
                <p className="font-medium">
                  {trainer?.work_online ? `Tak` : 'Nie'}
                </p>
              </div>
            </div>
          </PanelCard>
          <PanelCard title="Specjalizacje">
            {trainer?.specializations ? (
              <div className="flex gap-2">
                {JSON.parse(trainer?.specializations).map((spec: string) => (
                  <Button variant="outline" key={spec}>
                    {spec}
                  </Button>
                ))}
              </div>
            ) : (
              'Brak specjalizacji :('
            )}
          </PanelCard>
          <PanelCard title="Galeria zdjęć">
            <p>galeria content</p>
          </PanelCard>
          {trainer?.is_pro && (
            <PanelCard title="Opinie">
              <p>Brak opinii - Dodaj swoją</p>
            </PanelCard>
          )}
        </section>
      </Container>
    );
  }
};

const PanelCard = ({
  children,
  title
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="bg-white rounded-xl p-5 w-full border border-[#E9EFFF]">
      <div className="border-b pb-3 w-full mb-5">
        <p className="font-medium">{title}</p>
      </div>
      {children}
    </div>
  );
};

export default TrainerPage;
