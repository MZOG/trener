import Link from 'next/link';

type QuestionProps = {
  name: string;
  content: string;
};

const AdviceCard = ({ question }: { question: QuestionProps }) => {
  return (
    <Link
      href={`/zapytaj-trenera/001/ile-bialka-powinienem-jesc`}
      className="p-5 rounded-xl shadow-md border"
    >
      <p className="text-sm text-slate-500 mb-2">{question.name}</p>
      <p>{question.content}</p>
      <p className="mt-5 text-indigo-600">Zobacz odpowiedzi</p>
    </Link>
  );
};

export default AdviceCard;
