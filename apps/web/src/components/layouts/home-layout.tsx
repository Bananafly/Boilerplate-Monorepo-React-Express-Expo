import { useUser } from '@clerk/clerk-react';

// eslint-disable-next-line import/no-restricted-paths

function Home() {
  const { user } = useUser();
  if (!user) return null;
  const { firstName } = user;

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="w-full py-8 text-center">
        <h1 className="text-xl">Willkommen auf Meistr, {firstName}!</h1>
      </div>
    </div>
  );
}

export default Home;
