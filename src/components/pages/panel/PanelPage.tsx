'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
  EyeIcon,
  TrashIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { X } from 'lucide-react';
import { cn, slugify } from '@/lib/utils';
import { Trainer } from '@/types/Trainer';

// TipTap
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { ClientPageProps, GalleryImagesProps } from '@/types/PanelPage';
import ShowToast from '@/components/ShowToast';

type SpecsProps = string;

const SPECS = [
  'Core & Stability',
  'Cross training',
  'Kulturystyka',
  'Modelowanie sylwetki',
  'Poprawa kondycji',
  'Redukcja tkanki tłuszczowej',
  'Trening przygotowania motorycznego',
  'Trening dla kobiet',
  'Trening kettlebal',
  'Trening medyczny',
  'Trening motoryczny',
  'Trening ogólnorozwojowy',
  'Trening po ciąży',
  'Trening siłowy',
  'Trening wydolnościowy',
  'Trening wytrzymałościowy',
  'Trening funkcjonalny',
  'Trening wprowadzający',
  'Zwiększenie siły mięśniowej'
] satisfies SpecsProps[];

const ClientPage = ({ userID, avatar }: ClientPageProps) => {
  const [userInfo, setUserInfo] = useState<Trainer>();
  const [gallery, setGallery] = useState<GalleryImagesProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(20);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SpecsProps[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [profileStrength, setProfileStrength] = useState({
    mainInfo: true,
    about: false,
    specializations: false,
    gallery: false,
    social: false
  });
  const [newSpecs, setNewSpecs] = useState({
    comment: ''
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const SUPABASE_CDN = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/`;

  const { toast } = useToast();

  // MultiSelect
  const handleUnselect = (specs: SpecsProps) => {
    setSelected((prev) => prev.filter((s) => s !== specs));
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              // @ts-expect-error prevState typing
              setUserInfo((prevState) => {
                return {
                  ...prevState,
                  specializations: JSON.stringify(newSelected)
                };
              });

              return newSelected;
            });
          }
        }

        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = SPECS.filter((spec) => !selected.includes(spec));

  const supabase = createClient();

  const getData = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userID)
      .single();

    if (error) {
      ShowToast({
        title: 'Ups',
        description: 'Coś poszło nie tak',
        type: 'error'
      });
      return;
    }

    if (data) {
      setUserInfo(data);
      setLoading(false);

      if (JSON.parse(data?.specializations || '').length > 0) {
        setSelected(JSON.parse(data.specializations || ''));
        setProfileStrength((prevState) => {
          return {
            ...prevState,
            specializations: true
          };
        });
      }

      // Set the content for TipTap editor
      if (data.about === '<p></p>' || data.about === null) {
        editor?.commands.setContent(
          'Napisz coś o sobie (zaznacz tekst i kliknij pogrubienie aby pogrubić tekst)'
        );
      } else {
        editor?.commands.setContent(data.about);

        // Set profile strength if about section is filled
        setProfileStrength((prevState) => {
          return {
            ...prevState,
            about: true
          };
        });
      }

      // Both instagram and facebook should be filled
      if (data.instagram && data.facebook) {
        setProfileStrength((prevState) => {
          return {
            ...prevState,
            social: true
          };
        });
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-expect-error prevState typing
    setUserInfo((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      };
    });

    if (event.target.name === 'location') {
      // @ts-expect-error prevState typing
      setUserInfo((prevState) => {
        return {
          ...prevState,
          city: slugify(event.target.value)
        };
      });
    }
  };

  const handleWorkOnline = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-expect-error prevState typings
    setUserInfo((prevState) => {
      return {
        ...prevState,
        work_online: event
      };
    });
  };

  const handleDietPlan = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-expect-error prevState typings
    setUserInfo((prevState) => {
      return {
        ...prevState,
        diet_plan: event
      };
    });
  };

  const handleUpdateProfile = async () => {
    const { data, error } = await supabase
      .from('users')
      // @ts-expect-error not sure what is this..
      .update(userInfo)
      .eq('user_id', userID)
      .select();

    if (error)
      ShowToast({
        title: 'Błąd',
        description: 'Spróbuj zapisać zmiany jeszcze raz',
        type: 'error'
      });

    if (data) {
      ShowToast({
        title: 'Udało się',
        description: 'Zmiany zostały zapisane',
        type: 'ok'
      });
      checkStrength();
    }
  };

  const selectAccountType = async (isTrainer: boolean) => {
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

  const getImages = async () => {
    const { data } = await supabase.storage
      .from('gallery')
      .list(`${slugify(userInfo?.full_name || '')}_${userInfo?.id}/`, {
        offset: 0,
        sortBy: { column: 'name', order: 'desc' }
      });

    if (data !== null && data.length > 0) {
      setGallery(data);

      setProfileStrength((prevState) => {
        return {
          ...prevState,
          gallery: true
        };
      });

      checkStrength();
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e?.target?.files[0];
      const { data, error } = await supabase.storage
        .from('gallery')
        .upload(
          `${slugify(userInfo?.full_name || '')}_${userInfo?.id}/${uuidv4()}`,
          file,
          {
            cacheControl: '3600'
          }
        );

      if (data) {
        getImages();
        checkStrength();
      } else {
        console.log(error);
      }
    }
  };

  const handleRemoveImage = async (imageName: string) => {
    const { error } = await supabase.storage
      .from('gallery')
      .remove([`${userInfo?.id}/${imageName}`]);

    if (error) {
      console.log(error);
    } else {
      getImages();
      checkStrength();
    }
  };

  // TipTap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['paragraph']
      })
    ],
    onUpdate({ editor }) {
      // @ts-expect-error prevState typing
      setUserInfo((prevState) => {
        return {
          ...prevState,
          about: editor?.getHTML()
        };
      });
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none'
      }
    }
  }) as Editor;

  // @ts-expect-error editor typing..
  const MenuBar = ({ editor }) => {
    if (!editor) {
      return null;
    }

    return (
      <div className="control-group">
        <div className="flex gap-3 border-b pb-3 mb-3">
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
            variant={editor.isActive('bold') ? 'secondary' : 'outline'}
          >
            Pogrubienie
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            variant={editor.isActive('italic') ? 'secondary' : 'outline'}
          >
            Kursywa
          </Button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getData();
    if (userInfo?.id) {
      getImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    checkStrength();
  });

  // check profile strength
  function checkStrength() {
    const values = Object.values(profileStrength).filter(
      (a) => a === true
    ).length;

    switch (values) {
      case 1:
        setProgress(20);
        break;
      case 2:
        setProgress(40);
        break;
      case 3:
        setProgress(60);
        break;
      case 4:
        setProgress(80);
        break;
      case 5:
        setProgress(100);
        break;

      default:
        break;
    }
  }

  const handleChangeSpec = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSpecs((prevState) => {
      return {
        ...prevState,
        name: userInfo?.full_name,
        email: userInfo?.email,
        comment: event.target.value
      };
    });
  };

  const handleNewSpec = async () => {
    if (typeof newSpecs.comment === 'string' && newSpecs.comment.length === 0) {
      toast({
        title: 'Ups..',
        description: 'Wartość nie może być pusta :('
      });
    } else {
      const { data, error } = await supabase
        .from('spec_ideas')
        .insert(newSpecs)
        .select();

      if (error) {
        ShowToast({
          title: 'Ups..',
          description: 'Coś poszło nie tak',
          type: 'error'
        });
      }

      if (data) {
        ShowToast({
          title: 'Dzięki!',
          description: 'Twoja propozycja została wysłana',
          type: 'ok'
        });
      }
    }
  };

  const handleTrenerProTrial = async () => {
    const { data, error } = await supabase
      .from('users')
      .update({ is_pro: true })
      .eq('user_id', userID)
      .select();

    if (error)
      ShowToast({
        title: 'Błąd',
        description: 'Spróbuj zapisać zmiany jeszcze raz',
        type: 'error'
      });

    if (data) {
      ShowToast({
        title: 'Udało się',
        description: 'Zmiany zostały zapisane',
        type: 'ok'
      });
      getData();
      checkStrength();
    }
  };

  if (loading) {
    return <LoadingPanel />;
  }

  // ten check do wyjebania
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

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <PencilIcon className="w-5 h-5 hidden group-hover:block cursor-pointer" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Informacje ogólne</AlertDialogTitle>
                      <AlertDialogDescription className="space-y-3">
                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                          <Label htmlFor="location" className="text-trenerDark">
                            Miejscowość
                          </Label>
                          <Input
                            onChange={handleChange}
                            type="text"
                            id="location"
                            name="location"
                            className="text-trenerDark"
                            value={userInfo.location || ''}
                          />
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                          <Label htmlFor="phone" className="text-trenerDark">
                            Numer telefonu
                          </Label>
                          <Input
                            onChange={handleChange}
                            type="text"
                            id="phone"
                            name="phone"
                            className="text-trenerDark"
                            value={userInfo.phone ?? '-'}
                            placeholder="Tylko cyfry"
                          />
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                          <Label htmlFor="price" className="text-trenerDark">
                            Cena za godzinę
                          </Label>
                          <Input
                            onChange={handleChange}
                            type="number"
                            id="price"
                            name="price"
                            className="text-trenerDark"
                            value={userInfo.price || '-'}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="work_online"
                            name="work_online"
                            onCheckedChange={(e) =>
                              // @ts-expect-error event typing
                              handleWorkOnline(e)
                            }
                            defaultChecked={
                              userInfo?.work_online
                                ? userInfo?.work_online
                                : undefined
                            }
                          />
                          <Label
                            htmlFor="work_online"
                            className="text-trenerDark"
                          >
                            Prowadzenie online
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="diet_plan"
                            name="diet_plan"
                            onCheckedChange={(e) =>
                              // @ts-expect-error event typing
                              handleDietPlan(e)
                            }
                            defaultChecked={
                              userInfo?.diet_plan
                                ? userInfo?.diet_plan
                                : undefined
                            }
                          />
                          <Label
                            htmlFor="diet_plan"
                            className="text-trenerDark"
                          >
                            Plan dietetyczny
                          </Label>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Anuluj</AlertDialogCancel>
                      <AlertDialogAction onClick={handleUpdateProfile}>
                        Zapisz
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {!userInfo.is_pro && (
                <Button
                  onClick={handleTrenerProTrial}
                  className="bg-trenerBlue rounded-xl p-3 text-white font-medium"
                >
                  Aktywuj Trener PRO na 7 dni
                </Button>
              )}

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
                  {userInfo.price ? `${userInfo.price} zł` : '-'}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Prowadzenie online</p>
                <p className="font-medium">
                  {userInfo.work_online ? `Tak` : 'Nie'}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Plan dietetyczny</p>
                <p className="font-medium">
                  {userInfo.diet_plan ? `Tak` : 'Nie'}
                </p>
              </div>

              {userInfo.is_pro && (
                <div>
                  <p className="text-sm text-trenerBlue font-medium">
                    Trener PRO
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white p-7 rounded-xl flex flex-col gap-4 border group">
              <div className="flex justify-between border-b pb-2">
                <p className="font-medium">Siła profilu trenera</p>
              </div>

              <div className="flex items-center justify-between gap-5">
                <Progress value={progress} className="w-[80%]" />
                <p className="font-medium">{progress}%</p>
              </div>

              <div className="bg-trenerBlue px-3 py-3 rounded-lg">
                {progress === 100 ? (
                  <p className="text-sm font-semibold text-white ">
                    Super! Twój profil jest kompletny
                  </p>
                ) : (
                  <p className="text-sm font-medium text-white ">
                    Uzupełnione profile zyskują{' '}
                    <span className="block font-bold">więcej wyświetleń</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div
                  className={cn(
                    'flex items-center gap-2 text-gray-400',
                    profileStrength.mainInfo && 'text-trenerBlue'
                  )}
                >
                  {profileStrength.mainInfo ? (
                    <CheckCircleIcon className="h-6 w-6" />
                  ) : (
                    <ExclamationCircleIcon className="h-6 w-6" />
                  )}
                  <p className="font-medium">Informacje ogólne</p>
                </div>
                <div
                  className={cn(
                    'flex items-center gap-2 text-gray-400',
                    profileStrength.about && 'text-trenerBlue'
                  )}
                >
                  {profileStrength.about ? (
                    <CheckCircleIcon className="h-6 w-6" />
                  ) : (
                    <ExclamationCircleIcon className="h-6 w-6" />
                  )}
                  <p className="font-medium">O mnie</p>
                </div>
                <div
                  className={cn(
                    'flex items-center gap-2 text-gray-400',
                    profileStrength.specializations && 'text-trenerBlue'
                  )}
                >
                  {profileStrength.specializations ? (
                    <CheckCircleIcon className="h-6 w-6" />
                  ) : (
                    <ExclamationCircleIcon className="h-6 w-6" />
                  )}
                  <p className="font-medium">Specjalizacje</p>
                </div>
                <div
                  className={cn(
                    'flex items-center gap-2 text-gray-400',
                    profileStrength.gallery && 'text-trenerBlue'
                  )}
                >
                  {profileStrength.gallery ? (
                    <CheckCircleIcon className="h-6 w-6" />
                  ) : (
                    <ExclamationCircleIcon className="h-6 w-6" />
                  )}
                  <p className="font-medium">Galeria zdjęć</p>
                </div>
                <div
                  className={cn(
                    'flex items-center gap-2 text-gray-400',
                    profileStrength.social && 'text-trenerBlue'
                  )}
                >
                  {profileStrength.social ? (
                    <CheckCircleIcon className="h-6 w-6" />
                  ) : (
                    <ExclamationCircleIcon className="h-6 w-6" />
                  )}
                  <p className="font-medium">Social media</p>
                </div>
              </div>
            </div>

            {/* Trener PRO */}
            <ProFeatures is_pro={userInfo.is_pro} />
          </aside>

          {/* Panel content */}
          <section className="w-full space-y-5">
            {/* O mnie */}
            <PanelCard title="O mnie">
              <MenuBar editor={editor} />
              <EditorContent editor={editor} />
            </PanelCard>

            {/* Specjalizacje */}
            <PanelCard
              is_pro={userInfo.is_pro}
              unlock_text="Odblokuj więcej specjalizacji - Trener PRO"
              title={
                userInfo.is_pro
                  ? 'Specjalizacje'
                  : `Specjalizacje (${selected.length}/5)`
              }
            >
              <div>
                <Command
                  onKeyDown={handleKeyDown}
                  className="overflow-visible bg-transparent"
                >
                  <div className="group rounded-md text-sm flex items-center">
                    <div className="flex flex-wrap gap-1">
                      {selected.map((spec, index) => {
                        return (
                          <Badge
                            key={index}
                            variant="specs"
                            className="text-sm font-medium"
                          >
                            {spec}
                            <button
                              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleUnselect(spec);
                                  const newSpecs = selected.filter(
                                    (s) => s !== spec
                                  );
                                  // @ts-expect-error prevState typing
                                  setUserInfo((prevState) => {
                                    return {
                                      ...prevState,
                                      specializations: JSON.stringify(newSpecs)
                                    };
                                  });
                                }
                              }}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onClick={() => {
                                handleUnselect(spec);
                                const newSpecs = selected.filter(
                                  (s) => s !== spec
                                );
                                // @ts-expect-error prevState typing
                                setUserInfo((prevState) => {
                                  return {
                                    ...prevState,
                                    specializations: JSON.stringify(newSpecs)
                                  };
                                });
                              }}
                            >
                              <X className="h-3.5 w-3.5 text-muted-foreground/60 hover:text-foreground" />
                            </button>
                          </Badge>
                        );
                      })}
                      {/* Avoid having the "Search" Icon */}

                      <div
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        className="flex items-center"
                      >
                        <CommandPrimitive.Input
                          ref={inputRef}
                          value={inputValue}
                          onValueChange={setInputValue}
                          onBlur={() => setOpen(false)}
                          onFocus={() => setOpen(true)}
                          placeholder={
                            userInfo.is_pro
                              ? 'Kliknij aby wybrać'
                              : selected.length >= 5 && !userInfo.is_pro
                                ? 'Odblokuj więcej specjalizacji'
                                : 'Kliknij aby wybrać'
                          }
                          className={cn(
                            'ml-2 flex-1 min-w-[210px] bg-transparent outline-none placeholder:text-muted-foreground'
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-2">
                    <CommandList>
                      {open && selectables.length > 0 && selected.length < 5 ? (
                        <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                          <CommandGroup className="h-full overflow-auto">
                            {selectables.map((specs) => {
                              return (
                                <CommandItem
                                  key={specs}
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  onSelect={() => {
                                    setInputValue('');
                                    setSelected((prev) => [...prev, specs]);
                                    // @ts-expect-error prevState typing
                                    setUserInfo((prevState) => {
                                      return {
                                        ...prevState,
                                        specializations: JSON.stringify([
                                          ...selected,
                                          specs
                                        ])
                                      };
                                    });
                                  }}
                                  className={'cursor-pointer'}
                                >
                                  {specs}
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </div>
                      ) : userInfo.is_pro && open ? (
                        <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                          <CommandGroup className="h-full overflow-auto">
                            {selectables.map((specs) => {
                              return (
                                <CommandItem
                                  key={specs}
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  onSelect={() => {
                                    setInputValue('');
                                    setSelected((prev) => [...prev, specs]);
                                    // @ts-expect-error prevState typing
                                    setUserInfo((prevState) => {
                                      return {
                                        ...prevState,
                                        specializations: JSON.stringify([
                                          ...selected,
                                          specs
                                        ])
                                      };
                                    });
                                  }}
                                  className={'cursor-pointer'}
                                >
                                  {specs}
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </div>
                      ) : null}
                    </CommandList>
                  </div>
                </Command>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="link" className="text-xs">
                      Brak Twojej specjalizacji?
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Zaproponuj specjalizacje
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Podaj specjalizacje, których brakuje (oddzielone
                        przecinkiem)
                        <Input
                          type="text"
                          name="comment"
                          onChange={handleChangeSpec}
                          className="mt-2"
                        />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Anuluj</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleNewSpec}
                        disabled={
                          typeof newSpecs.comment === 'string' &&
                          newSpecs.comment.length === 0
                        }
                      >
                        Zaproponuj
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </PanelCard>

            {/* Galeria */}
            <PanelCard
              is_pro={userInfo?.is_pro}
              unlock_text="Odblokuj więcej zdjęć - Trener PRO"
              title={
                userInfo.is_pro
                  ? 'Galeria zdjęć'
                  : `Galeria zdjęć (${gallery?.length}/4)`
              }
            >
              <div className="grid gap-3 grid-cols-4">
                {gallery.length > 0 &&
                  gallery?.map((image) => (
                    <div
                      key={`${SUPABASE_CDN}/${slugify(userInfo.full_name || '')}_${userInfo?.id}/${image.name}`}
                      className="space-y-2"
                    >
                      <Image
                        src={`${SUPABASE_CDN}/${slugify(userInfo.full_name || '')}_${userInfo?.id}/${image.name}`}
                        alt={image.name}
                        width={162}
                        height={240}
                        className="rounded-xl"
                      />
                      <Button
                        variant="default"
                        onClick={() => handleRemoveImage(image.name)}
                      >
                        <TrashIcon className="w-5 h-5 text-white" />
                      </Button>
                    </div>
                  ))}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="gallery-image"
                  className={cn(
                    'flex items-center gap-2 text-sm font-medium bg-trenerBlue hover:bg-trenerBlue/80 text-white px-4 py-1.5 outline-none rounded-lg w-max cursor-pointer mx-auto',
                    !userInfo.is_pro &&
                      gallery.length >= 4 &&
                      'cursor-not-allowed'
                  )}
                >
                  <CloudArrowUpIcon className="w-6 h-6" />
                  {!userInfo.is_pro && gallery.length >= 4
                    ? 'Odblokuj więcej zdjęć'
                    : 'Dodaj zdjęcie'}
                  <input
                    type="file"
                    id="gallery-image"
                    className="hidden"
                    disabled={!userInfo.is_pro && gallery.length >= 4}
                    onChange={(e) => handleUploadImage(e)}
                  />
                </label>
              </div>
              <p className="text-sm md:text-center mt-2">
                Polecamy dodawać zdjęcia 9:16 (1080px:1920px)
              </p>
            </PanelCard>

            {/* Social media */}
            <PanelCard title="Social media">
              <div className="flex flex-col gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    onChange={handleChange}
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
                    onChange={handleChange}
                    type="text"
                    name="facebook"
                    id="facebook"
                    placeholder="https://www.facebook.com/marcinzogrodnik1993/"
                    value={userInfo.facebook || ''}
                  />
                  <p className="text-sm">Pełny link</p>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="www">Strona WWW</Label>
                  <Input
                    onChange={handleChange}
                    type="text"
                    name="www"
                    id="www"
                    value={userInfo.www || ''}
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
  title,
  children,
  unlock_text,
  is_pro
}: {
  title: string;
  children: React.ReactNode;
  unlock_text?: string;
  is_pro?: boolean | null;
}) => {
  return (
    <div className="bg-white p-7 rounded-xl flex flex-col w-full gap-4 border group">
      <div className="flex justify-between border-b pb-2">
        <p className="font-medium">{title}</p>
        {!is_pro && (
          <Button asChild variant="link">
            <Link href="/trener-pro">{unlock_text}</Link>
          </Button>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

const ProFeatures = ({ is_pro }: { is_pro: boolean | null | undefined }) => {
  const FEATURES = [
    {
      id: 1,
      name: 'Wyróżnij profil na stronie miasta',
      disabled: false
    },
    {
      id: 2,
      name: 'Promocja w social media',
      disabled: false
    },
    {
      id: 3,
      name: 'Oceny i opinie trenera',
      disabled: false
    },
    {
      id: 4,
      name: 'Więcej specjalizacji',
      disabled: false
    },
    {
      id: 5,
      name: 'Galeria +',
      disabled: false
    },
    {
      id: 6,
      name: 'Tworzenie planów treningowych',
      disabled: true
    },
    {
      id: 7,
      name: 'Wiadomości prywatne',
      disabled: true
    },
    {
      id: 8,
      name: 'Raporty',
      disabled: true
    },
    {
      id: 9,
      name: 'Kalendarz',
      disabled: true
    }
  ];

  if (!is_pro) {
    return (
      <div className="p-7 bg-trenerBlue rounded-lg text-white">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Trener PRO</p>
          <Button asChild variant="secondary">
            <Link href="/trener-pro">Kup za 39 zł</Link>
          </Button>
        </div>

        <div className="mt-4 space-y-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className={cn(
                'flex items-center gap-2',
                feature.disabled && 'opacity-50'
              )}
            >
              {feature.disabled ? (
                <LockClosedIcon className="w-5 h-5 text-white" />
              ) : (
                <CheckIcon className="w-5 h-5 text-white" />
              )}
              <p className="font-medium">{feature.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-7 bg-trenerBlue rounded-lg text-white">
      <p className="font-medium">Trener PRO jest aktywny</p>
      <p className="text-xs">Zarządzaj subskrypcją (link do easycart)</p>
    </div>
  );
};

const LoadingPanel = () => {
  return (
    <section className="max-w-3xl mx-auto px-5">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[700px]" />
        <Skeleton className="h-4 w-[600px]" />
        <Skeleton className="h-4 w-[600px]" />
      </div>
    </section>
  );
};

export default ClientPage;
