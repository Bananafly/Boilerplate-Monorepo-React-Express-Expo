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
            const { HomePage } = await import("./home.tsx");
            // biome-ignore lint/style/useNamingConvention: We don't control the React Router API and it needs to be Capitalized
            return { Component: HomePage };
          },
        },
        {
          path: "/tasks",
          lazy: async () => {
            const { TasksPage } = await import("./tasks/tasks.tsx");
            // biome-ignore lint/style/useNamingConvention: We don't control the React Router API and it needs to be Capitalized
            return { Component: TasksPage };
          },
        },
        {
          path: "/calendar",
          lazy: async () => {
            const { CalendarPage } = await import("./calendar/calendar.tsx");
            // biome-ignore lint/style/useNamingConvention: We don't control the React Router API and it needs to be Capitalized
            return { Component: CalendarPage };
          },
        },
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
