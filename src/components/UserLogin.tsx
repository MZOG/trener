import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const UserLogin = () => {
  return (
    <>
      <SignedOut>
        <SignInButton fallbackRedirectUrl="/panel">
          <p className="cursor-pointer text-lg md:text-sm md:font-medium">
            Dla trenera
          </p>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-4">
          <UserButton />
          <Link
            href="/panel"
            className="text-sm font-medium hover:text-trenerBlue"
          >
            Panel
          </Link>
        </div>
      </SignedIn>
    </>
  );
};

export default UserLogin;
