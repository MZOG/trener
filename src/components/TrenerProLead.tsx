'use client';
import Link from 'next/link';

const TrenerProLead = () => {
  return (
    <Link
      href="/rejestracja"
      className="pulse_lead hover:bg-trenerDark text-sm inline-block font-medium mt-10 py-2 px-4 bg-trenerBlue text-white rounded-full"
    >
      TrenerPRO dla pierwszych 30 trenerów!{' '}
      <span className="font-semibold">Zarejestruj się</span>
    </Link>
  );
};

export default TrenerProLead;
