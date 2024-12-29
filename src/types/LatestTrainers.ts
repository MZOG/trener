export interface TrainerCardProps {
  location: string | null;
  full_name: string | null;
  slug: string | null;
  is_female: boolean | null;
  is_pro: boolean | null;
}

export type TrainerProps = Pick<
  TrainerCardProps,
  'full_name' | 'location' | 'slug' | 'is_female' | 'is_pro'
> & {
  compact?: boolean;
};
