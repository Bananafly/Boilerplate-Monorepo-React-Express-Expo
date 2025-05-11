import { SignIn } from '@clerk/clerk-react';

import AuthLayout from '@/components/layouts/auth-layout';

export function LoginRoute() {
  return (
    <AuthLayout title="Log in to your account">
      <SignIn />
    </AuthLayout>
  );
}
