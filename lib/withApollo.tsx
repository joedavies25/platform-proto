import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './apolloClient';
import Head from 'next/head';
import App from 'next/app';
import React from 'react';

let globalApolloClient = null;

export const initOnContext = (ctx) => {
  const inAppContext = Boolean(ctx.ctx);

  if (process.env.NODE_ENV === 'development') {
    if (inAppContext) {
      console.warn(
        'Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n' +
          'Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n',
      );
    }
  }

  const apolloClient = ctx.apolloClient(
    ctx.apolloState || {},
    inAppContext ? ctx.ctx : ctx,
  );

  apolloClient.toJSON = () => null;

  ctx.apolloCLient = apolloClient;
  if (inAppContext) {
    ctx.ctx.apolloClient = apolloClient;
  }

  return ctx;
};

const getHeaders = async (ctx) => {
  if (typeof window !== 'undefined') return null;
  if (typeof ctx.req === 'undefined') return null;

  const jwt =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im9mQW5wRlp2N1NMWm9ic2w4WlpFeCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTAzNTk1MTYwNzg4MTQ4MDg3MDkyIn0sImdpdmVuX25hbWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkRhdmllcyIsIm5pY2tuYW1lIjoiam9lZGF2aWVzMjUwMCIsIm5hbWUiOiJKb2UgRGF2aWVzIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSndhbXEyYzZNN2x0eXduU0g5RUN0X3BSY2VNV2lzYklUTWNPQUlyPXM5Ni1jIiwibG9jYWxlIjoiZW4tR0IiLCJ1cGRhdGVkX2F0IjoiMjAyMS0wNy0xM1QxNTowMDowMC43ODdaIiwiZW1haWwiOiJqb2VkYXZpZXMyNTAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi1icHUxdHd2eC5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDM1OTUxNjA3ODgxNDgwODcwOTIiLCJhdWQiOiJLbTVKWlRSYk91d3pnRzFmR1A1ZDlPeGxDcTZST0FyayIsImlhdCI6MTYyNjE4ODQwMiwiZXhwIjoxNjI2MjI0NDAyLCJub25jZSI6IlBaX3d2YXhELW5zUmx0TEx3c1dZZjZWX1pJTmJnSDdFOGJBaHpvV1NVU0kifQ.L_YrNE_ufZVskExODhLYCc4KtxMxf986GzC5azuLsVj8XEe7jLnxpXnkhe2yznOWoInDP_fq_UfmpOQzvtSWELpglc_K_B01OUScWkcHAyRPTtYcf53uxmisiuHv31wBy_GkSH7Wxl9b7sDfGHBlUgaolwBN5iR70HpEyLEnwHUVpPkghycon5b_AGkoBxMMxege-x5RCzxcckn5Xfr56Zzc15H44K7Ve7h3gjEPsoF5SqG3BvVQB_c0nAMng6GKqYhvyEdJRhj5lx9jEG9ikL7E4a_ib5Hb-Z3zRE_GkEJKDowQRSx_67k0mYAko7OpN7n4I0dwadbINXR_YYMdJw';

  return {
    authorization: `Bearer ${jwt}`,
  };
};

const initApolloClient = (initialState, headers) => {
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, headers);
  }

  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, headers);
  }

  return globalApolloClient;
};

export const withApollo = ({ ssr = true } = {}) => (PageComponent) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    let client;
    if (apolloClient) {
      client = apolloClient;
    } else {
      client = initApolloClient(apolloState, {});
    }

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';
    WithApollo.displayName = `withApollo(${displayName})`;
  }
  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      const { AppTree } = ctx;

      const apolloClient = (ctx.apolloClient = initApolloClient(
        null,
        await getHeaders(ctx),
      ));

      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      if (typeof window === 'undefined') {
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        if (ssr) {
          try {
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />,
            );
          } catch (err) {
            console.error('ERror while running `getDataFromTree`', err);
          }

          Head;
        }
      }

      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };
  }
  return WithApollo;
};
