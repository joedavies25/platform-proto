import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { AuthProvider } from '../context/authStore';
import { ApolloProvider } from '@apollo/client';
import { withApollo } from '../lib/withApollo';
import { GlobalProvider } from '../context/globalStore';

function MyApp({ Component, pageProps }: AppProps) {
  const id_token = process.env.MOCK_JWT;
  return (
    <GlobalProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </GlobalProvider>
  );
}

export default withApollo()(MyApp);
