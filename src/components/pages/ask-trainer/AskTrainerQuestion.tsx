import Container from '@/components/Container';
import { AskTrainerPageProps } from '@/app/(pages)/zapytaj-trenera/[id]/[slug]/page';

export default function AskTrainerQuestion({ id, slug }: AskTrainerPageProps) {
  // fetch question
  // fetch answers
  // add option to answer only for trainers

  return (
    <Container width="max-w-4xl">
      <p>{id}</p>
      <p>{slug}</p>
    </Container>
  );
}
