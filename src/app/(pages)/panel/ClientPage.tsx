'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

import { useToast } from '@/hooks/use-toast';
import Container from '@/components/Container';
import {
  CheckIcon,
  PencilIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  LockClosedIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { Trainer } from '@/types/Trainer';
import { Progress } from '@/components/ui/progress';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { FancyMultiSelect } from '@/components/ui/fancy-multi-select';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

type ClientPageProps = {
  userID: string;
  avatar: string | StaticImport;
};

const ClientPage = ({ userID, avatar }: ClientPageProps) => {
  const [selected, setSelected] = useState<boolean>();
  const [userInfo, setUserInfo] = useState<Trainer>();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(20);
  const { toast } = useToast();

  const supabase = createClient();

  const getData = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userID);

    if (data) {
      setUserInfo(data[0]);
      setLoading(false);
    }

    if (error) {
      console.log(error);
    }
  };

  const selectAccountType = async (isTrainer: boolean) => {
    setSelected(true);
    setLoading(true);
    const { data, error } = await supabase
      .from('users')
      .update({ is_trainer: isTrainer })
      .eq('user_id', userID)
      .select();

    if (error) {
      toast({
        title: 'Ups..',
        description: 'Coś poszło nie tak'
      });
    }

    if (data) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [loading]);

  if (loading) {
    return (
      <section className="max-w-3xl mx-auto px-5">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[700px]" />
          <Skeleton className="h-4 w-[600px]" />
          <Skeleton className="h-4 w-[600px]" />
        </div>
      </section>
    );
  }

  if (userInfo?.is_trainer === null) {
    return (
      <section className="max-w-3xl mx-auto px-5">
        <div className="p-10 bg-white border rounded-xl">
          <p>
            Panel jest dostępny w dwóch opcjach, dla trenera oraz dla
            trenującego.
          </p>
          <p>Wybierz opcję, która pasuje do Ciebie.</p>

          <div className="mt-10 flex gap-5">
            <Button onClick={() => selectAccountType(true)}>
              Jestem trenerem
            </Button>
            <Button onClick={() => selectAccountType(false)} variant="outline">
              Szukam trenera
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (userInfo?.is_trainer) {
    return (
      <>
        <Container className="flex justify-end mt-5 mb-5">
          <Link
            href={`/trener/${slugify(userInfo.full_name || '')}`}
            className="flex items-center gap-2 group"
          >
            <EyeIcon className="w-6 h-6" />
            <p className="group-hover:underline underline-offset-4">
              Zobacz jak wygląda Twój profil
            </p>
          </Link>
        </Container>
        <Container className="flex gap-5 mb-10">
          <aside className="min-w-[350px] space-y-5">
            <div className="bg-white p-7 rounded-xl flex flex-col gap-4 border group">
              <div className="flex justify-between border-b pb-2">
                <p className="font-medium">Informacje ogólne</p>
                <PencilIcon className="w-5 h-5 hidden group-hover:block cursor-pointer" />
              </div>

              {userInfo.full_name && (
                <div className="flex items-center gap-5">
                  {avatar ? (
                    <Image
                      src={avatar}
                      alt={userInfo.full_name}
                      width={80}
                      height={80}
                      className="aspect-square rounded-full"
                    />
                  ) : (
                    <Skeleton className="w-20 h-20 rounded-full" />
                  )}

                  <p className="font-medium">{userInfo.full_name}</p>
                </div>
              )}

              {userInfo.location && (
                <div>
                  <p className="text-sm text-slate-500">Miejscowość</p>
                  <p className="font-medium">{userInfo.location}</p>
                </div>
              )}

              {userInfo.phone && (
                <div>
                  <p className="text-sm text-slate-500">Numer telefonu</p>
                  <p className="font-medium">{userInfo.phone}</p>
                </div>
              )}
            </div>

            <div className="bg-white p-7 rounded-xl flex flex-col gap-4 border group">
              <div className="flex justify-between border-b pb-2">
                <p className="font-medium">Siła profilu trenera</p>
              </div>

              <div className="flex items-center justify-between gap-5">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Progress value={progress} className="w-[60%]" />
                <p className="font-medium">{progress}%</p>
              </div>

              <div className="bg-trenerBlue px-3 py-2 rounded-lg">
                <p className="text-sm font-medium text-white ">
                  Uzupełnione profile zyskują{' '}
                  <span className="block font-bold">3x więcej wyświetleń</span>
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-6 w-6 text-trenerBlue" />
                  <p className="font-medium text-trenerBlue">
                    Informacje ogólne
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ExclamationCircleIcon className="h-6 w-6 text-gray-400" />
                  <p className="font-medium text-gray-400">O mnie</p>
                </div>
                <div className="flex items-center gap-2">
                  <ExclamationCircleIcon className="h-6 w-6 text-gray-400" />
                  <p className="font-medium text-gray-400">Specjalizacje</p>
                </div>
                <div className="flex items-center gap-2">
                  <ExclamationCircleIcon className="h-6 w-6 text-gray-400" />
                  <p className="font-medium text-gray-400">Galeria zdjęć</p>
                </div>
                <div className="flex items-center gap-2">
                  <ExclamationCircleIcon className="h-6 w-6 text-gray-400" />
                  <p className="font-medium text-gray-400">Social media</p>
                </div>
              </div>
            </div>

            {/* Trener PRO */}
            {!userInfo.is_pro ? (
              <div className="p-7 bg-trenerBlue rounded-lg text-white">
                <p className="font-semibold">Trener PRO</p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-white" />
                    <p className="font-medium">
                      Wyróżnij profil na stronie miasta
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-white" />
                    <p className="font-medium">Promocja w social media</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-white" />
                    <p className="font-medium">Oceny i opinie trenera</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-white" />
                    <p className="font-medium">Więcej specjalizacji</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-white" />
                    <p className="font-medium">Galeria +</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-50">
                    <LockClosedIcon className="w-5 h-5 text-white" />
                    <p className="font-medium">Wiadomości prywatne</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-50">
                    <LockClosedIcon className="w-5 h-5 text-white" />
                    <p className="font-medium">Tworzenie planów treningowych</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-50">
                    <LockClosedIcon className="w-5 h-5 text-white" />
                    <p className="font-medium">Raporty</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-50">
                    <LockClosedIcon className="w-5 h-5 text-white" />
                    <p className="font-medium">Kalendarz</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>jesteś Trener PRO</div>
            )}
          </aside>

          {/* Panel content */}
          <section className="w-full space-y-5">
            <PanelCard title="O mnie" editable>
              {userInfo.about ? (
                <p>about text from supabase</p>
              ) : (
                <div className="flex flex-col items-center gap-5 justify-center py-10">
                  <p className="font-medium">
                    Napisz kilka zdań o sobie, oraz swoim doświadczeniu
                  </p>
                  <Button variant="ghost" className="text-trenerBlue">
                    + Dodaj opis
                  </Button>
                </div>
              )}
            </PanelCard>
            <PanelCard title="Specjalizacje (0/5)" editable={false} unlock>
              <div>
                <FancyMultiSelect />
                <p className="text-xs hover:text-trenerBlue inline-flex font-medium cursor-pointer">
                  Brak Twojej specjalizacji? (modal)
                </p>
              </div>
            </PanelCard>
            <PanelCard title="Galeria zdjęć (0/4)" editable unlock>
              <div className="grid gap-3 grid-cols-4">
                <Skeleton className="w-[150px] h-[150px]" />
                <Skeleton className="w-[150px] h-[150px]" />
                <Skeleton className="w-[150px] h-[150px]" />
                <Skeleton className="w-[150px] h-[150px]" />
              </div>
            </PanelCard>
            <PanelCard title="Social media" editable>
              <div>social media content</div>
            </PanelCard>
          </section>
        </Container>
      </>
    );
  } else {
    return (
      <div className="max-w-3xl mx-auto px-5">
        <div className="bg-white p-8 border rounded-2xl">
          <h1>Panel użytkownika</h1>
        </div>
      </div>
    );
  }
};

const PanelCard = ({
  unlock,
  title,
  editable,
  children
}: {
  unlock?: boolean;
  title: string;
  editable: boolean;
  children: JSX.Element;
}) => {
  return (
    <div className="bg-white p-7 rounded-xl flex flex-col w-full gap-4 border group">
      <div className="flex justify-between border-b pb-2">
        <p className="font-medium">
          {title}{' '}
          {unlock && (
            <Button asChild variant="ghost" className="ml-5 text-gray-300">
              <Link href="/trener-pro" className="text-sm font-normal">
                Odblokuj funkcję - Trener PRO
              </Link>
            </Button>
          )}
        </p>
        {editable && (
          <PencilIcon className="w-5 h-5 hidden group-hover:block cursor-pointer" />
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ClientPage;
