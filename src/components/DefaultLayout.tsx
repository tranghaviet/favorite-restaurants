import Head from 'next/head';
import type { ReactNode } from 'react';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Favorite Restaurants</title>
        <meta name="description" content="A simple app to view and favorite restaurants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">{children}</main>
    </>
  );
};
