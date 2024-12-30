import Link from 'next/link';
import { TrainerCardProps } from '@/types/LatestTrainers';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';
import { StarFilledIcon } from '@radix-ui/react-icons';

const TrainerCard = ({
  trainer,
  compact
}: {
  trainer: TrainerCardProps;
  compact?: boolean;
}) => {
  const { full_name, slug, location, is_female, is_pro, about } = trainer;

  // do not show trainers without name (after register error)
  if (!full_name || !location) {
    return;
  }

  if (compact) {
    return (
      <Link
        href={`/trener/${slug}`}
        className={cn(
          `flex gap-2 items-center text-[15px] group hover:underline underline-offset-4`,
          is_female ? `decoration-[#FF8AF3]` : `decoration-[#8ADEFF]`
        )}
      >
        <span
          className={cn(
            `w-[5px] h-[15px] rounded-xl`,
            is_female ? `bg-[#FF8AF3]` : `bg-[#8ADEFF]`
          )}
        ></span>
        <span
          className={cn(
            is_female
              ? `group-hover:bg-[#FF8AF3]/10`
              : `group-hover:bg-[#8ADEFF]/10`
          )}
        >
          {full_name}
        </span>
      </Link>
    );
  }

  if (is_pro) {
    return (
      <Card className="p-4 bg-blue-50 border-blue-400">
        <Link href={`/trener/${slug}`}>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center">
              <Skeleton className="size-20 rounded-full" />
              <div>
                <h3 className="text-sm font-medium">{full_name}</h3>
                <div className="flex gap-1">
                  <div className="flex">
                    <StarFilledIcon width={14} />
                    <StarFilledIcon width={14} />
                    <StarFilledIcon width={14} />
                    <StarFilledIcon width={14} />
                    <StarFilledIcon width={14} />
                  </div>
                  <p className="text-xs text-nowrap">(14 ocen)</p>
                </div>
              </div>
            </div>
            <div
              className="text-sm overflow-hidden text-ellipsis line-clamp-3"
              dangerouslySetInnerHTML={{ __html: about as string }}
            />
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'shadow-none border-slate-100 bg-[#FBFCFF] rounded-xl self-start'
      )}
    >
      <Link className="p-2 flex items-center gap-2" href={`/trener/${slug}`}>
        <Skeleton className="size-14 rounded-full bg-gray-100" />
        <div>
          <h3 className="text-sm font-medium">{full_name}</h3>
          <p className="text-sm text-slate-600">{location}</p>
        </div>
      </Link>
    </Card>
  );
};

export default TrainerCard;
