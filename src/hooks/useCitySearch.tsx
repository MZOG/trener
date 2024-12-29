import { useState, useMemo } from 'react'
import { miasta } from '@/lib/miasta';

export function useCitySearch() {
  const [search, setSearch] = useState('');

  const filteredCities = useMemo(() => {
    if (search === '') return [];
    return miasta.filter(city => city.name.toLowerCase().includes(search.toLowerCase()));
  }, [search])

  return { search, setSearch, filteredCities };
}