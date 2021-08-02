import { ApolloClient, InMemoryCache, HttpLink, onError } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

let id_token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im9mQW5wRlp2N1NMWm9ic2w4WlpFeCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTAzNTk1MTYwNzg4MTQ4MDg3MDkyIn0sImdpdmVuX25hbWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkRhdmllcyIsIm5pY2tuYW1lIjoiam9lZGF2aWVzMjUwMCIsIm5hbWUiOiJKb2UgRGF2aWVzIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSndhbXEyYzZNN2x0eXduU0g5RUN0X3BSY2VNV2lzYklUTWNPQUlyPXM5Ni1jIiwibG9jYWxlIjoiZW4tR0IiLCJ1cGRhdGVkX2F0IjoiMjAyMS0wNy0xM1QxNTowMDowMC43ODdaIiwiZW1haWwiOiJqb2VkYXZpZXMyNTAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi1icHUxdHd2eC5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDM1OTUxNjA3ODgxNDgwODcwOTIiLCJhdWQiOiJLbTVKWlRSYk91d3pnRzFmR1A1ZDlPeGxDcTZST0FyayIsImlhdCI6MTYyNjE4ODQwMiwiZXhwIjoxNjI2MjI0NDAyLCJub25jZSI6IlBaX3d2YXhELW5zUmx0TEx3c1dZZjZWX1pJTmJnSDdFOGJBaHpvV1NVU0kifQ.L_YrNE_ufZVskExODhLYCc4KtxMxf986GzC5azuLsVj8XEe7jLnxpXnkhe2yznOWoInDP_fq_UfmpOQzvtSWELpglc_K_B01OUScWkcHAyRPTtYcf53uxmisiuHv31wBy_GkSH7Wxl9b7sDfGHBlUgaolwBN5iR70HpEyLEnwHUVpPkghycon5b_AGkoBxMMxege-x5RCzxcckn5Xfr56Zzc15H44K7Ve7h3gjEPsoF5SqG3BvVQB_c0nAMng6GKqYhvyEdJRhj5lx9jEG9ikL7E4a_ib5Hb-Z3zRE_GkEJKDowQRSx_67k0mYAko7OpN7n4I0dwadbINXR_YYMdJw';

const createHttpLink = (headers) => {
  const httpLink = new HttpLink({
    uri: 'https://platform-proto.hasura.app/v1/graphql',
    headers: headers,
  });
  return httpLink;
};

const createWsLink = () => {
  return new WebSocketLink(
    new SubscriptionClient('wss://platform-proto.hasura.app/v1/graphql', {
      lazy: true,
      reconnect: true,
      connectionParams: () => {
        return {
          headers: {
            authorization: `Bearer ${id_token}`,
          },
        };
      },
    }),
  );
};

export const createApolloClient = (initialState, headers) => {
  const ssrMode = typeof window === 'undefined';
  let link;
  if (ssrMode) {
    link = createHttpLink(headers);
  } else {
    link = createWsLink();
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  });
};
