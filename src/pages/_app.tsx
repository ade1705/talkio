import { AppProps } from 'next/app';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { User, userContext } from '@/context/user-context';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */
const user: User = { email: 'ade' };

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <userContext.Provider value={user}>
      <Component {...pageProps} />
    </userContext.Provider>
  );
}

export default MyApp;
