import Container from '@/components/Container';
import NewQuestion from '@/components/pages/ask-trainer/NewQuestion';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zapytaj trenera'
};

export default function AskTrainer() {
  return (
    <Container>
      <h1>Zapytaj trenera</h1>

      <NewQuestion />
    </Container>
  );
}
