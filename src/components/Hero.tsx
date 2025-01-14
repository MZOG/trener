// components
import CitySearch from '../components/CitySearch';
import Container from './Container';

const Hero = () => {
  return (
    <Container className="max-w-xl flex flex-col gap-5 items-center mt-5 md:mt-10">
      <h1 className="md:text-center text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
        Znajdź swojego <span className="md:block">trenera personalnego</span>
      </h1>
      <div className="min-w-[400px] flex items-center justify-center">
        <CitySearch />
      </div>
    </Container>
  );
};

export default Hero;
