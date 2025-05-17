/** @format */

import { UserButton, useUser } from "@clerk/clerk-react";

export function HomePage() {
  const { user } = useUser();
  if (!user) return null;
  const { firstName } = user;

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="w-full py-8 text-center">
        <h1 className="text-xl">Welcome, {firstName}!</h1>
        <UserButton />
      </div>
    </div>
  );
}
