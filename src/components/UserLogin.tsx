import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const UserLogin = () => {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default UserLogin;
