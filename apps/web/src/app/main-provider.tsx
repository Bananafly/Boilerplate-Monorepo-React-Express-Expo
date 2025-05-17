/** @format */

import { MainErrorFallback } from "@/components/errors/main";
import { Spinner } from "@/components/ui/spinner";
import { AuthProvider } from "@/context/auth-context";
import { queryClient } from "@/lib/react-query";
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

import { LoginRoute } from "./routes/auth/login";

type AppProviderProps = {
  children: React.ReactNode;
};
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <ClerkProvider
          publishableKey={PUBLISHABLE_KEY}
          appearance={{
            elements: {
              footer: "hidden",
            },
          }}
        >
          <ClerkLoading>
            <div className="flex h-screen items-center justify-center">
              <Spinner size="xl" />
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <AuthProvider>
                <HelmetProvider>
                  <QueryClientProvider client={queryClient}>
                    {import.meta.env.DEV && <ReactQueryDevtools />}
                    <Toaster />
                    {children}
                  </QueryClientProvider>
                </HelmetProvider>
              </AuthProvider>
            </SignedIn>
            <SignedOut>
              <LoginRoute />
            </SignedOut>
          </ClerkLoaded>
        </ClerkProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
}
