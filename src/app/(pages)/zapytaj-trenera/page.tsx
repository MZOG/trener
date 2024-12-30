import Container from '@/components/Container';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AskTrainer() {
  return (
    <Container>
      <h1>Zapytaj trenera</h1>

      <AlertDialog>
        <AlertDialogTrigger>
          <Button>Zadaj pytanie</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Zadaj pytanie</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p className="mb-2">O co chcesz zapytać kolo</p>
              <Textarea />
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Imię</Label>
                <Input type="text" placeholder="Jak masz na imie gościu" />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction>Zapytaj</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Container>
  );
}
