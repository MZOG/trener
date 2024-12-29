import Container from '@/components/Container';
import { Textarea } from '@/components/ui/textarea';

export default function AskTrainer() {
  return (
    <Container>
      <h1>Zapytaj trenera</h1>
      <p>Tutaj jakiś opis</p>

      <hr />

      <h2>Dodaj Twoje pytanie</h2>
      <Textarea />
    </Container>
  );
}
