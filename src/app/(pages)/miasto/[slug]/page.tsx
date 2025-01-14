import { createClient } from '@/lib/supabase/ssr';
import CityContent from '@/components/pages/city/CityContent';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('users')
    .select('location')
    .eq('city', (await params).slug);

  if (error) {
    return {};
  }

  if (data) {
    return {
      title: data[0]?.location || 'Nie znaleziono trenerów',
      description: data[0]?.location
        ? `Trenerzy personalni ${data[0]?.location}`
        : 'Nie znaleziono trenerów'
    };
  }
}

const CityPage = ({ params }: { params: { slug: string } }) => {
  return <CityContent slug={params.slug} />;
};

export default CityPage;
