import { slugify } from '@/lib/utils';
import Link from 'next/link';
import { TrainerProps } from '@/types/LatestTrainers';

const LatestTrainerCard = (trainer: TrainerProps) => {
  const { full_name, location } = trainer;
  return (
    <Link
      href={`/trener/${slugify(full_name)}`}
      className="p-3 rounded-lg flex items-center gap-4 group border hover:border-trenerBlue"
    >
      <div className="size-14 rounded-full bg-gray-100"></div>
      <div>
        <h3 className="group-hover:text-trenerBlue">{full_name}</h3>
        <p className="text-sm text-slate-800">{location}</p>
      </div>
    </Link>
  );
};

export default LatestTrainerCard;
