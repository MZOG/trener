import { cn } from '@/lib/utils';
import { Trainer } from '@/types/Trainer';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import { Star, StarIcon } from 'lucide-react';

const TrainerCard = ({ trainer }: { trainer: Trainer }) => {
  const { full_name, is_pro, price, about } = trainer;
  const slug = slugify(full_name || '');

  const cleanAbout = about?.replace(/(<([^>]+)>)/gi, '');

  const CardTitle = ({
    title,
    pro
  }: {
    title: string | null;
    pro: boolean | null;
  }) => {
    return (
      <h2 className="font-medium flex items-center gap-2">
        {pro && (
          <div className="bg-trenerBlue p-1 rounded-full">
            <Star size={18} strokeWidth={2} color="white" />
          </div>
        )}
        {title}
      </h2>
    );
  };

  const Rating = () => {
    return (
      <div className="flex flex-col self-start">
        <span className="text-[11px] font-medium">Ocena</span>
        <div className="flex gap-1 pt-0.5">
          <StarIcon
            size={18}
            strokeWidth={2}
            className="stroke-trenerBlue"
            absoluteStrokeWidth
          />
          <StarIcon
            size={18}
            strokeWidth={2}
            className="stroke-trenerBlue"
            absoluteStrokeWidth
          />
          <StarIcon
            size={18}
            strokeWidth={2}
            className="stroke-trenerBlue"
            absoluteStrokeWidth
          />
          <StarIcon
            size={18}
            strokeWidth={2}
            className="stroke-trenerBlue"
            absoluteStrokeWidth
          />
          <StarIcon
            size={18}
            strokeWidth={2}
            className="stroke-trenerBlue"
            absoluteStrokeWidth
          />
        </div>
      </div>
    );
  };

  const Price = () => {
    return (
      <p className="font-semibold flex flex-col self-end">
        <span className="text-[11px] font-medium">Cena za godzinę</span>
        <span className="text-trenerBlue">{price} zł</span>
      </p>
    );
  };

  return (
    <Link
      href={`/trener/${slug}`}
      className={cn(
        'border rounded-2xl p-2 w-[270px] hover:shadow-xl transition-all',
        is_pro && 'bg-trenerBlue/5 border-trenerBlue/20 relative shadow-md'
      )}
    >
      <Skeleton className="w-full h-[250px] rounded-xl bg-primary/50 animate-none" />
      <div className="px-3 space-y-4 mt-3">
        <CardTitle title={full_name} pro={is_pro} />
        <p className="line-clamp-2">{cleanAbout}</p>
        <div className="flex justify-between items-center pb-2">
          {is_pro && <Rating />}
          {price && <Price />}
        </div>
      </div>
    </Link>
  );
};

export default TrainerCard;
