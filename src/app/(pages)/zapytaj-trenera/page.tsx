import Container from '@/components/Container';
import NewQuestion from '@/components/pages/ask-trainer/NewQuestion';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zapytaj trenera',
  description:
    'Masz pytanie dotyczące treningu, diety lub zdrowego stylu życia? Zapytaj trenera i otrzymaj odpowiedź od profesjonalisty.'
};

export default function AskTrainer() {
  return (
    <Container>
      <h1>Zapytaj trenera</h1>
      <NewQuestion />
    </Container>
  );
}
