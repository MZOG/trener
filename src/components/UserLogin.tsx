import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from './ui/button';

const UserLogin = () => {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button className="text-sm" variant="outline">
            Zaloguj się
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-2">
          <UserButton />
          <Link href="/panel" className="text-sm">
            Panel
          </Link>
        </div>
      </SignedIn>
    </>
  );
};

export default UserLogin;
