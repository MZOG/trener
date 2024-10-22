'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { miasta } from '@/lib/miasta';
type Item = {
  id: number;
  name: string;
};

const CitySearch = () => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleOnSelect = (item: { id: number; name: string }) => {
    setSelectedCity(item.name);
    console.log(item.name);
  };

  const formatResult = (item: { id: number; name: string }) => {
    return <p className="pl-2 py-1">{item.name}</p>;
  };
  return (
    <div className="relative z-40">
      <ReactSearchAutocomplete<Item>
        items={miasta}
        maxResults={5}
        // onSearch={handleOnSearch}
        // onHover={handleOnHover}
        onSelect={handleOnSelect}
        // onFocus={handleOnFocus}
        autoFocus
        fuseOptions={{ keys: ['name'] }}
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
        size="citySearch"
        variant="citySearch"
        className="absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full"
      >
        Szukaj
      </Button>
    </div>
  );
};

export default CitySearch;
