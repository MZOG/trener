import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { FiltersProps, HandleFiltersProps } from '@/types/Filters';
import { useState } from 'react';

export default function CityFilters({ handleFilters }: HandleFiltersProps) {
  const [price, setPrice] = useState<number>(0);
  const [womanOnly, setWomanOnly] = useState<boolean>();
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [online, setOnline] = useState<boolean>();
  const [dietPlan, setDietPlan] = useState<boolean>();

  const handleFilterChange = (
    key: keyof FiltersProps,
    value: string | boolean | null
  ) => {
    handleFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value
    }));
  };

  return (
    <aside className="col-span-3 border rounded-xl p-5 space-y-3 self-start">
      {/* WOMAN ONLY */}
      <p className="font-medium">Filtry</p>
      <div className="flex items-center space-x-2">
        <Switch
          checked={womanOnly}
          id="womanOnly"
          onCheckedChange={(event) => {
            handleFilterChange('womanOnly', event === true ? true : null);
            setWomanOnly(event);
          }}
        />
        <Label htmlFor="womanOnly" className="cursor-pointer">
          Tylko kobiety
        </Label>
      </div>

      {/* ONLINE */}
      <div className="flex items-center space-x-2">
        <Switch
          checked={online}
          id="online"
          onCheckedChange={(event) => {
            handleFilterChange('online', event === true ? true : null);
            setOnline(event);
          }}
        />
        <Label htmlFor="online" className="cursor-pointer">
          Prowadzenie online
        </Label>
      </div>

      {/* DIET PLAN */}
      <div className="flex items-center space-x-2">
        <Switch
          checked={dietPlan}
          id="dietPlan"
          onCheckedChange={(event) => {
            handleFilterChange('dietPlan', event === true ? true : null);
            setDietPlan(event);
          }}
        />
        <Label htmlFor="dietPlan" className="cursor-pointer">
          Plan dietetyczny
        </Label>
      </div>

      {/* CENA */}
      <div className="flex flex-col space-y-4 hidden">
        <Label htmlFor="price">Przedział cenowy</Label>

        <div className="flex items-center space-x-3">
          <p className="text-sm font-medium whitespace-nowrap">min zł</p>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            // className={cn("w-[60%]", className)}
            // {...props}
          />
          <p className="text-sm font-medium whitespace-nowrap">max zł</p>
        </div>
      </div>

      {/* SPECIALIZATIONS */}
      <p className="hidden">specjalizations</p>
    </aside>
  );
}
