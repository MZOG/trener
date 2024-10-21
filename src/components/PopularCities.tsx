'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Skeleton } from './ui/skeleton';

type CitiesProps = {
  city: string;
  location: string;
};

const PopularCities = () => {
  const [cities, setCities] = useState<CitiesProps[]>();
  const [loading, setLoading] = useState(true);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );

  const getCities = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('city, location')
      .not('is_trainer', 'is', false);

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
