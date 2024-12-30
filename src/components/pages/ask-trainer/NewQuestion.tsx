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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function NewQuestion() {
  return (
    <AlertDialog>
      <Button asChild>
        <AlertDialogTrigger>Zadaj pytanie</AlertDialogTrigger>
      </Button>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-6">Zadaj pytanie</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title" className="text-black">
                Tytuł
              </Label>
              <Input type="text" placeholder="Jak masz na imie gościu" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title" className="text-black">
                Pytanie
              </Label>
              <Textarea rows={5} placeholder="Dokładnie opisz swoje pytanie" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-black">
                E-mail
              </Label>
              <Input type="email" placeholder="Twój e-mail" />
              <p className="text-sm text-black/70">
                Wyślemy powiadomienia o odpowiedziach
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label
                htmlFor="terms"
                className="text-xs text-black font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Akceptuję poniższy{' '}
                <Link
                  className="text-blue-600 hover:underline"
                  href="/regulamin"
                >
                  Regulamin
                </Link>{' '}
                oraz zapoznałem się z{' '}
                <Link
                  className="text-blue-600 hover:underline"
                  href="/polityka-prywatności"
                >
                  Polityką Prywatności
                </Link>
              </Label>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction>Zapytaj</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
