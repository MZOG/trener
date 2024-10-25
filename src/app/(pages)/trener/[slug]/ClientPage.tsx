'use client';
import { createClient } from '@/lib/supabase/client';
import Container from '@/components/Container';
import { useEffect, useState } from 'react';
import { Trainer } from '@/types/Trainer';
import { Skeleton } from '@/components/ui/skeleton';
import { Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

// icons

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
        <aside className="space-y-4">
          <p>image</p>
          <p>(pro) oceny</p>
          <h1>{trainer?.full_name || ''}</h1>

          <div>
            <p className="text-sm text-gray-600">Miejscowość</p>
            <p className="font-medium">
              {trainer?.location ? trainer?.location : '-'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Numer telefonu</p>
            <a
              href={`tel:+48${trainer?.phone}`}
              className="font-medium hover:text-trenerBlue"
            >
              {trainer?.phone ? trainer?.phone : '-'}
            </a>
          </div>
          <div>
            <p className="text-sm text-gray-600">E-mail</p>
            <a
              href={`mailto:${trainer?.email}`}
              className="font-medium hover:text-trenerBlue"
            >
              {trainer?.email ? trainer?.email : '-'}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Instagram />
            <a
              href={`https://instagram.com/${trainer?.instagram}`}
              className="font-medium hover:text-trenerBlue"
            >
              {trainer?.instagram}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Facebook />
            <a
              href={`${trainer?.facebook}`}
              className="font-medium hover:text-trenerBlue"
            >
              Profil facebook
            </a>
          </div>

          <p>(pro) ocen trenera</p>
          <p>zgłoś trenera</p>
        </aside>

        <section className="space-y-5 flex-grow">
          <PanelCard title="O mnie">
            <div dangerouslySetInnerHTML={{ __html: trainer?.about || '' }} />
            <div className="border-t mt-5 pt-5 flex items-center gap-5">
              <div>
                <p className="text-sm text-gray-500">Cena za godzinę</p>
                <p className="font-medium">
                  {trainer?.price ? `${trainer?.price} zł / h` : '-'}
                </p>
              </div>
            </div>
          </PanelCard>
          <PanelCard title="Specjalizacje">
            {trainer?.specializations ? (
              <div className="flex gap-2">
                {JSON.parse(trainer?.specializations).map((spec) => (
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
          <PanelCard title="Opinie">
            <p>opnie content</p>
          </PanelCard>
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
