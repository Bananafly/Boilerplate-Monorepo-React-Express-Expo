import { SignUp } from '@clerk/clerk-react';

import AuthLayout from '@/components/layouts/auth-layout';

export function RegisterRoute() {
  return (
    <AuthLayout title="Register your account">
      <SignUp />
    </AuthLayout>
  );
}
