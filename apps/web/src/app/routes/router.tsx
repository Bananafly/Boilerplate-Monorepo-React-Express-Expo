/** @format */

import { SignedIn } from "@clerk/clerk-react";
// import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/components/layouts/root-layout.tsx";

const createRouter = (/* queryClient: QueryClient */) =>
  createBrowserRouter([
    {
      path: "/auth/register",
      lazy: async () => {
        const { RegisterRoute } = await import("./auth/register.tsx");
        // biome-ignore lint/style/useNamingConvention: We don't control the React Router API and it needs to be Capitalized
        return { Component: RegisterRoute };
      },
    },
    {
      path: "/auth/login",
      lazy: async () => {
        const { LoginRoute } = await import("./auth/login.tsx");
        // biome-ignore lint/style/useNamingConvention: We don't control the React Router API and it needs to be Capitalized
        return { Component: LoginRoute };
      },
    },
    {
      path: "",
      element: (
        <SignedIn>
          <RootLayout />
        </SignedIn>
      ),
      children: [
        {
          path: "/",
          lazy: async () => {
            const { HomeRoute } = await import("./home.tsx");
            // biome-ignore lint/style/useNamingConvention: We don't control the React Router API and it needs to be Capitalized
            return { Component: HomeRoute };
          },
        },
        // {
        //   path: 'Kunden',
        //   lazy: async () => {
        //     const { CustomerOverviewRoute } = await import(
        //       './app/customers/overview.tsx'
        //     );
        //     return { Component: CustomerOverviewRoute };
        //   },
        // },
      ],
    },
    {
      path: "*",
      lazy: async () => {
        const { NotFoundRoute } = await import("./not-found.tsx");
        // biome-ignore lint/style/useNamingConvention: We don't control the React Router API and it needs to be Capitalized
        return { Component: NotFoundRoute };
      },
    },
  ]);
export default createRouter;
