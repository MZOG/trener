'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Skeleton } from './ui/skeleton';

const PopularCities = () => {
  const [cities, setCities] = useState<string[]>();
  const [loading, setLoading] = useState(true);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );

  const getCities = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('city, location');

    if (data) {
      const mapFromCities = new Map(data.map((c) => [c.city, c]));
      const uniqueCities = [...mapFromCities.values()];
      setCities(uniqueCities);
      setLoading(false);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  // const cities = [
  //   { name: 'Warszawa', href: '/miasto/warszawa' },
  //   { name: 'Poznań', href: '/miasto/poznan' },
  //   { name: 'Katowice', href: '/miasto/katowice' },
  //   { name: 'Gdańsk', href: '/miasto/gdansk' },
  //   { name: 'Wrocław', href: '/miasto/wroclaw' },
  //   { name: 'Kraków', href: '/miasto/krakow' }
  // ];

  if (loading) {
    return <Skeleton className="h-5 w-80" />;
  }

  return (
    <div>
      <p className="text-xs text-slate-800">Popularne miasta:</p>
      <ul className="flex gap-5 mt-1">
        {cities?.map((city, index) => (
          <li key={index} className="text-sm">
            <Link
              href={`/miasto/${city.city}`}
              className="hover:underline underline-offset-2"
            >
              {city.location}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularCities;
