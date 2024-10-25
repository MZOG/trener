import { createClient } from '@/lib/supabase/ssr';
import TrainerPage from './ClientPage';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('users')
    .select('full_name, location')
    .eq('slug', (await params).slug);

  if (error) {
    return {};
  }

  if (data) {
    return {
      title: data[0]?.full_name || 'Ups, coś poszło nie tak',
      description: data[0]?.full_name
        ? `${data[0]?.full_name} trener personalny ${data[0]?.location}`
        : '404'
    };
  }
}

const TrenerPage = ({ params }: { params: { slug: string } }) => {
  return <TrainerPage slug={params.slug} />;
};

export default TrenerPage;
