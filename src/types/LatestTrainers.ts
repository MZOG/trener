export interface TrainerCardProps {
  location?: string | null | undefined;
  full_name?: string | null | undefined;
  slug?: string | null | undefined;
  is_female?: boolean | null | undefined;
  is_pro?: boolean | null | undefined;
  about?: string | null | undefined;
}

export type TrainerProps = Pick<
  TrainerCardProps,
  'full_name' | 'location' | 'slug' | 'is_female' | 'is_pro' | 'about'
> & {
  compact?: boolean;
};
