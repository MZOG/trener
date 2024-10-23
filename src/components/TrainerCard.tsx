import { cn } from '@/lib/utils';
import { Trainer } from '@/types/Trainer';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import { StarIcon } from '@heroicons/react/24/solid';

const TrainerCard = ({ trainer }: { trainer: Trainer }) => {
  const { full_name, is_pro, price } = trainer;
  const slug = slugify(full_name || '');

  return (
    <Link
      href={`/trener/${slug}`}
      className={cn(
        'border rounded-xl p-1',
        is_pro && 'bg-trenerBlue text-white border-none relative'
      )}
    >
      {is_pro && (
        <p className="bg-white absolute z-20 -top-4 right-4 border border-trenerBlue py-1.5 px-3 text-sm text-trenerBlue font-medium rounded-full inline-block">
          Polecany trener
        </p>
      )}
      <Skeleton className="w-[250px] h-[250px] rounded-lg bg-primary/50"></Skeleton>
      <div className="px-3 space-y-2 mt-3">
        <h2 className="font-semibold text-[17px]">{full_name}</h2>
        <p>opis</p>
        <div className="flex justify-between items-center pb-3">
          <div className="flex">
            <StarIcon
              className={cn(
                'h-5 w-5 text-trenerBlue',
                is_pro && 'h-5 w-5 text-white'
              )}
            />
            <StarIcon
              className={cn(
                'h-5 w-5 text-trenerBlue',
                is_pro && 'h-5 w-5 text-white'
              )}
            />
            <StarIcon
              className={cn(
                'h-5 w-5 text-trenerBlue',
                is_pro && 'h-5 w-5 text-white'
              )}
            />
            <StarIcon
              className={cn(
                'h-5 w-5 text-trenerBlue',
                is_pro && 'h-5 w-5 text-white'
              )}
            />
            <StarIcon
              className={cn(
                'h-5 w-5 text-trenerBlue',
                is_pro && 'h-5 w-5 text-white'
              )}
            />
          </div>
          <p>{price && <p className="font-semibold">{price} zł /h</p>}</p>
        </div>
      </div>
    </Link>
  );
};

export default TrainerCard;
