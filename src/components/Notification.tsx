import { useToast } from '@/hooks/use-toast';

type NotificationProps = {
  title?: string;
  description?: string;
  type: 'Ok' | 'Error';
};

const Notification = ({ type, title, description }: NotificationProps) => {
  const { toast } = useToast();

  if (type === 'Error') {
    toast({
      title: title,
      description: description,
      variant: 'destructive'
    });
  }

  if (type === 'Ok') {
    toast({
      title: title,
      description: description,
      variant: 'responseOK'
    });
  }
};

export default Notification;
