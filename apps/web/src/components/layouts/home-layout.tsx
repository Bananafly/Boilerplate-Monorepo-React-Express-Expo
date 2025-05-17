/** @format */

import { useUser } from "@clerk/clerk-react";

function Home() {
  const { user } = useUser();
  if (!user) return null;
  const { firstName } = user;

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="w-full py-8 text-center">
        <h1 className="text-xl">Willkommen, {firstName}!</h1>
      </div>
    </div>
  );
}

export default Home;
