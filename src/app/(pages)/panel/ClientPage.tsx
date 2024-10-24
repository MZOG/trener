'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

import { useToast } from '@/hooks/use-toast';
import Container from '@/components/Container';
import {
  PencilIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { Trainer } from '@/types/Trainer';
import { Progress } from '@/components/ui/progress';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { FancyMultiSelect } from '@/components/ui/fancy-multi-select';

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
      <Container className="flex gap-5">
        <>
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
          </aside>

          <section className="w-full space-y-5">
            <div className="bg-white p-7 rounded-xl flex flex-col w-full gap-4 border group">
              <div className="flex justify-between border-b pb-2">
                <p className="font-medium">O mnie</p>
                <PencilIcon className="w-5 h-5 hidden group-hover:block cursor-pointer" />
              </div>
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
            </div>
            <div className="bg-white p-7 rounded-xl flex flex-col w-full gap-4 border group">
              <div className="flex justify-between border-b pb-2">
                <p className="font-medium">Specjalizacje</p>
                <PencilIcon className="w-5 h-5 hidden group-hover:block cursor-pointer" />
              </div>
              <div>
                <FancyMultiSelect />
              </div>
            </div>
            <div className="bg-white p-7 rounded-xl flex flex-col w-full gap-4 border group">
              <div className="flex justify-between border-b pb-2">
                <p className="font-medium">Galeria zdjęć</p>
                <PencilIcon className="w-5 h-5 hidden group-hover:block cursor-pointer" />
              </div>
            </div>
            <div className="bg-white p-7 rounded-xl flex flex-col w-full gap-4 border group">
              <div className="flex justify-between border-b pb-2">
                <p className="font-medium">Social media</p>
                <PencilIcon className="w-5 h-5 hidden group-hover:block cursor-pointer" />
              </div>
            </div>
          </section>
        </>
      </Container>
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

export default ClientPage;
