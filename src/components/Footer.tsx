import Container from '@/components/Container';
import { MailIcon } from 'lucide-react';
import Link from 'next/link';

const footerLinks = [
  {
    id: 1,
    name: 'Start',
    link: '/'
  },
  {
    id: 2,
    name: 'Dla trenera',
    link: '/dla-trenera'
  },
  {
    id: 3,
    name: 'Dla trenującego',
    link: '/dla-trenujacego'
  },
  {
    id: 4,
    name: 'O nas',
    link: '/o-nas'
  },
  {
    id: 5,
    name: 'Zapytaj trenera',
    link: '/zapytaj-trenera'
  },
  {
    id: 6,
    name: 'Trener PRO',
    link: '/trener-pro'
  }
];

const Footer = () => {
  return (
    <Container className="mt-20 mb-5 border-t pt-5 flex flex-col md:flex-row gap-5 md:gap-20">
      <div className="space-y-2">
        <p className="font-medium">Znajdź trenera i umów się na trening</p>
        <p className="text-zinc-600 text-sm">
          Darmowa wyszukiwarka trenerów personalnych
        </p>

        <div className="flex items-center text-zinc-600 group gap-2">
          <MailIcon size={16} className="group-hover:text-black" />
          <a
            href="mailto:hello@trenerpersonalny.io"
            className="text-sm group-hover:text-black group-hover:underline underline-offset-2"
          >
            hello@trenerpersonalny.io
          </a>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-medium">Na skróty</p>

        <ul className="space-y-2 sm:columns-2">
          {footerLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.link}
                className="text-zinc-600 text-sm hover:text-black hover:underline underline-offset-2"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default Footer;
