'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger
// } from '@/components/ui/alert-dialog';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { FancyMultiSelect } from '@/components/ui/fancy-multi-select';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

// TipTap
import TipTapEditor from '@/components/TipTapEditor';
import { Label } from '@/components/ui/label';

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

  const handleInstagram = (event) => {
    setUserInfo((prevState) => {
      return {
        ...prevState,
        instagram: event.target.value
      };
    });
  };

  const handleFacebook = (event) => {
    setUserInfo((prevState) => {
      return {
        ...prevState,
        facebook: event.target.value
      };
    });
  };

  const handleUpdateProfile = async () => {
    const { data, error } = await supabase
      .from('users')
      .update(userInfo)
      .eq('user_id', userID)
      .select();

    if (error) {
      console.log(error);

      toast({
        title: 'Ups..',
        description: 'Coś poszło nie tak'
      });
    }

    if (data) {
      toast({
        title: 'Fajnie',
        description: 'Zmiany zostały zapisane'
      });
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

              <div>
                <p className="text-sm text-slate-500">Miejscowość</p>
                <p className="font-medium">
                  {userInfo.location
                    ? userInfo.location
                    : 'Uzupełnij swoje miasto'}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Numer telefonu</p>
                <p className="font-medium">
                  {userInfo.phone ? userInfo.phone : '-'}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Cena za godzinę</p>
                <p className="font-medium">
                  {userInfo.price ? `${userInfo.price} zł` : '-'}{' '}
                </p>
              </div>
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
              <div>Jesteś Trener PRO!</div>
            )}
          </aside>

          {/* Panel content */}
          <section className="w-full space-y-5">
            <PanelCard title="O mnie" editable={false}>
              <TipTapEditor />
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
            <PanelCard title="Social media" editable={false}>
              <div className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    onChange={handleInstagram}
                    type="text"
                    id="instagram"
                    name="instagram"
                    placeholder="np. mrcn"
                    value={userInfo.instagram || ''}
                  />
                  <p className="text-sm">Nazwa np. mrcn</p>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    onChange={handleFacebook}
                    type="text"
                    name="facebook"
                    id="facebook"
                    placeholder="https://www.facebook.com/marcinzogrodnik1993/"
                    value={userInfo.facebook || ''}
                  />
                  <p className="text-sm">Pełny link</p>
                </div>
              </div>
            </PanelCard>

            <Button onClick={handleUpdateProfile}>Zapisz</Button>
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
  children: React.ReactNode;
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
