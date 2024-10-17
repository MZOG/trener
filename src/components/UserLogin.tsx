import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const UserLogin = () => {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <button className="text-sm">Zaloguj się</button>
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
