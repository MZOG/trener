import { toast } from '@/hooks/use-toast';

type ToastProps = {
  title?: string;
  description?: string;
  type?: 'ok' | 'error';
};

const ShowToast = ({ title, description, type }: ToastProps) => {
  if (type === 'error') {
    toast({
      title: title,
      description: description,
      variant: 'destructive'
    });
  } else {
    toast({
      title: title,
      description: description,
      variant: 'responseOK'
    });
  }
};

export default ShowToast;
