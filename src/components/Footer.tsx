import Container from '@/components/Container';

const Footer = () => {
  return (
    <Container className="mt-20 mb-5 border-t pt-5">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} - TrenerPersonalny.io
      </p>
      <p className="text-xs">
        Made with ❤️ by <a href="">Marcin Zogrodnik</a>
      </p>
    </Container>
  );
};

export default Footer;
