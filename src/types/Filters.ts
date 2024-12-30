export type FiltersProps = {
  price: number | null;
  womanOnly: boolean | null;
  specializations: string[] | null;
  online: boolean | null;
  dietPlan: boolean | null;
};

export type HandleFiltersProps = {
  handleFilters: (data: FiltersProps) => void;
};
