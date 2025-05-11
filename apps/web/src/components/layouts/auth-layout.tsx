import * as React from 'react';

import { Head } from '@/components/seo';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="flex h-screen items-center justify-center">
        {children}
      </div>
    </>
  );
}
