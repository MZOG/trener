import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <section className="flex items-center justify-center pt-10">
      <SignIn />
    </section>
  );
}
