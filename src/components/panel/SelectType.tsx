'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const SelectType = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(false);

  const handleSelect = (isTrainer: boolean) => {
    // setSelected(isTrainer);
    // router.refresh();
    console.log(`isTrainer: ${isTrainer}`);
  };

  return (
    <section className="max-w-3xl mx-auto px-5">
      <div className="p-10 bg-white border rounded-xl">
        <p>
          Panel jest dostępny w dwóch opcjach, dla trenera oraz dla trenującego.
        </p>
        <p>Wybierz opcję, która pasuje do Ciebie.</p>

        <div className="mt-10 flex gap-5">
          <Button onClick={() => handleSelect(true)}>Jestem trenerem</Button>
          <Button onClick={() => handleSelect(false)} variant="outline">
            Szukam trenera
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SelectType;
