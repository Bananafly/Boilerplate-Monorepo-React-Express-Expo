/** @format */

import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useLocation } from "react-router-dom";

import { Toaster } from "../ui/sonner";
import { Spinner } from "../ui/spinner";

function RootLayout() {
  const location = useLocation();
  return (
    <React.Suspense
      fallback={
        <div className="flex size-full items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary
        key={location.pathname}
        fallback={<div>Something went wrong!</div>}
      >
        <div className="flex h-screen">
          <div className="flex-1 overflow-auto p-4">
            <Outlet />
          </div>
        </div>
        <Toaster />
      </ErrorBoundary>
    </React.Suspense>
  );
}

export default RootLayout;
