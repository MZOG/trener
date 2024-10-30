'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { miasta } from '@/lib/miasta';
import { slugify } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

type Item = {
  id: number;
  name: string;
};

const ReactSearchAutocomplete = dynamic(
  () =>
    import('react-search-autocomplete').then(
      (module) => module.ReactSearchAutocomplete<Item>
    ),
  {
    loading: () => <p>Loading...</p>
  }
);

const CitySearch = () => {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState('');

  const handleOnSelect = (item: { id: number; name: string }) => {
    setSelectedCity(slugify(item.name));
  };

  const formatResult = (item: { id: number; name: string }) => {
    return <p className="pl-2 py-1">{item.name}</p>;
  };

  const handleOnSearch = () => {
    if (selectedCity !== '') {
      router.push(`/miasto/${selectedCity}`);
    }
  };

  return (
    <>
      {ReactSearchAutocomplete ? (
        <div className="relative z-20">
          <ReactSearchAutocomplete
            items={miasta}
            maxResults={5}
            onSelect={handleOnSelect}
            autoFocus
            fuseOptions={{ keys: ['name'], shouldSort: true }}
            resultStringKeyName="name"
            formatResult={formatResult}
            showIcon={false}
            className="searchInput"
            styling={{
              boxShadow: 'none',
              height: '60px',
              borderRadius: '30px',
              fontSize: '16px'
            }}
          />
          <Button
            onClick={() => handleOnSearch()}
            size="citySearch"
            variant="citySearch"
            className="absolute z-30 top-1/2 right-2 transform -translate-y-1/2 rounded-full"
          >
            Szukaj
          </Button>
        </div>
      ) : (
        <p>elko</p>
      )}
    </>
  );
};

export default CitySearch;
