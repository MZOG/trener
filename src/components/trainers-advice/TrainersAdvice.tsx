import Container from '@/components/Container';
import AdviceCard from './AdviceCard';
import { Button } from '../ui/button';
import Link from 'next/link';

const questions = [
  {
    name: 'Janusz Tracz',
    content: 'Ile białka powinienem jeść, żeby urosły fajne mięśnie?'
  }
];

const TrainersAdvice = () => {
  return (
    <Container className="mt-14">
      <h2 className="text-lg font-medium">Porady trenerów</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {questions.map((question, index) => {
          return <AdviceCard question={question} key={index} />;
        })}
      </div>

      <div className="flex justify-center mt-10">
        <Button asChild>
          <Link href="/zapytaj-trenera">Zobacz więcej porad</Link>
        </Button>
      </div>
    </Container>
  );
};

export default TrainersAdvice;
