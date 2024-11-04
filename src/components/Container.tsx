import { cn } from '@/lib/utils';

type ContainerProps = {
  className?: string;
  type?: string;
  width?: string;
  children: React.ReactNode;
};

const Container = ({
  className,
  type = 'section',
  width,
  children
}: ContainerProps) => {
  if (type === 'div') {
    return (
      <div className={cn('px-5 mx-auto max-w-6xl', className, width)}>
        {children}
      </div>
    );
  }

  return (
    <section className={cn('mx-5 lg:mx-auto max-w-6xl', className, width)}>
      {children}
    </section>
  );
};

export default Container;
