import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <section className="flex items-center justify-center h-[80vh]">
      <SignIn />
    </section>
  );
}
