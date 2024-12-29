'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { slugify } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { ChevronRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { miasta } from '@/lib/miasta';

interface CitiesList {
  id: number;
  name: string;
}

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const [search, setSearch] = useState('');
  const [filteredCities, setFilteredCities] = useState<CitiesList[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    if (value.length >= 3) {
      const filtered: CitiesList[] = miasta.filter((city) =>
        city.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const popularCities = [
    {
      name: 'Katowice',
      slug: 'katowice'
    },
    {
      name: 'Warszawa',
      slug: 'warszawa'
    },
    {
      name: 'Gdańsk',
      slug: 'gdansk'
    },
    {
      name: 'Poznań',
      slug: 'poznan'
    },
    {
      name: 'Lędziny',
      slug: 'ledziny'
    },
    {
      name: 'Zabrze',
      slug: 'zabrze'
    },
    {
      name: 'Bytom',
      slug: 'bytom'
    },
    {
      name: 'Gliwice',
      slug: 'gliwice'
    }
  ];

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="cursor-pointer border py-4 px-3 bg-white rounded-md flex gap-2 relative w-full">
            <MapPin strokeWidth={1.5} />
            <p className="text-slate-500">Wpisz swoje miasto</p>
            <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 py-6">
              Szukaj trenera
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Miasto</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            id="city"
            value={search}
            autoComplete="off"
            className="h-[45px] min-w-[280px] bg-white"
            placeholder="Wpisz swoje miasto"
            onChange={handleSearchChange}
          />

          {filteredCities.length > 0 ? (
            <>
              <DialogHeader>
                <DialogTitle className="mt-2">Miasta</DialogTitle>
              </DialogHeader>

              <div className="space-y-3 max-h-52 overflow-y-scroll">
                {filteredCities.map((city, index) => (
                  <Link
                    key={index}
                    href={`/miasto/${slugify(city.name)}`}
                    className="flex items-center justify-between hover:text-indigo-600"
                  >
                    {city.name}
                    <ChevronRight strokeWidth={1.5} size={20} />
                  </Link>
                ))}
              </div>
            </>
          ) : search.length >= 3 ? (
            <p>Brak wyników..</p>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="mt-2">Popularne miasta</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-5">
                {popularCities.map((city, index) => {
                  return (
                    <div key={index}>
                      <Link
                        href={`/miasto/${city.slug}`}
                        className="flex items-center justify-between hover:text-indigo-600"
                      >
                        {city.name}
                        <ChevronRight strokeWidth={1.5} size={20} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="border p-3 bg-white rounded-md flex gap-2">
          <MapPin strokeWidth={1.5} />
          <p className="text-slate-500">Wpisz swoje miasto</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="px-5 pb-10">
        <DrawerHeader className="text-left px-0 py-2">
          <DrawerTitle>Miasto</DrawerTitle>
        </DrawerHeader>
        <Input
          type="text"
          id="city"
          value={search}
          autoComplete="off"
          className="min-h-[60px] min-w-[280px] bg-white text-[16px]"
          placeholder="Wpisz swoje miasto"
          onChange={handleSearchChange}
        />

        {filteredCities.length > 0 ? (
          <>
            <DialogHeader className="text-left pt-3 pb-3">
              <DialogTitle className="my-3">Miasta</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 max-h-52 overflow-y-scroll">
              {filteredCities.map((city, index) => (
                <Link
                  key={index}
                  href={`/miasto/${slugify(city.name)}`}
                  className="flex items-center justify-between hover:text-indigo-600"
                >
                  {city.name}
                  <ChevronRight strokeWidth={1.5} size={20} />
                </Link>
              ))}
            </div>
          </>
        ) : search.length >= 3 ? (
          <p>Brak wyników..</p>
        ) : (
          <>
            <DialogHeader className="text-left pt-3 pb-3">
              <DialogTitle className="my-3">Popularne miasta</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-5">
              {popularCities.map((city, index) => {
                return (
                  <div key={index}>
                    <Link
                      href={`/miasto/${city.slug}`}
                      className="flex items-center justify-between hover:text-indigo-600"
                    >
                      {city.name}
                      <ChevronRight strokeWidth={1.5} size={20} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CitySearch;
