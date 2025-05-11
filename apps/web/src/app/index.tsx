// import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';

import AppProvider from './main-provider.tsx';
import createRouter from './routes/index.tsx';

function AppRouter() {
  // const queryClient = useQueryClient();

  const router = useMemo(() => createRouter(), []);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
