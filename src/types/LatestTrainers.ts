export interface LatestTrainersProps {
  location: string | null;
  full_name: string | null;
}

export type TrainerProps = Pick<LatestTrainersProps, 'full_name' | 'location'>;
