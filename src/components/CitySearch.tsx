import { Input } from './ui/input';
import { Button } from './ui/button';

const CitySearch = () => {
  return (
    <div className="relative">
      <Input type="text" className="h-16 rounded-xl text-lg" />
      <Button
        size="citySearch"
        variant="citySearch"
        className="absolute top-1/2 right-2 transform -translate-y-1/2"
      >
        Szukaj
      </Button>
    </div>
  );
};

export default CitySearch;
