/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/** @format */

// Assume necessary Clerk imports based on your SDK version and TypeScript setup
import { useAuth, useOrganizationList } from '@clerk/clerk-react';
import { createContext, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  // Define any context values or functions, if necessary
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const useOrgAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useOrgAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const { isSignedIn } = auth;

  const { orgId } = auth;
  const hasActiveOrg = orgId !== null;

  useEffect(() => {
    const { isSignedIn } = auth; // Adjust based on your Clerk version's way to determine sign-in status
    // Perform necessary adjustments to check for an active organization based on your available methods
    if (
      isSignedIn &&
      isLoaded &&
      !hasActiveOrg &&
      userMemberships.data?.length > 0
    ) {
      // Assuming direct access to 'activeOrganizationId' is not available, adjust your logic here
      // This might involve making API calls or other methods provided by Clerk to check for an active org
      // If there's no active organization, set the first one
      // This is a placeholder logic; adjust based on actual availability in your Clerk SDK version
      setActive({ organization: userMemberships.data[0].organization.id });
    }
  }, [isSignedIn, isLoaded, userMemberships.data]);

  const value = {};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
