import AskTrainerQuestion from '@/components/pages/ask-trainer/AskTrainerQuestion';

// import meta + create seo

export type AskTrainerPageProps = {
  id: string;
  slug: string;
};

export default function AskTrainer({
  params
}: {
  params: AskTrainerPageProps;
}) {
  // return client component
  return <AskTrainerQuestion id={params.id} slug={params.slug} />;
}
