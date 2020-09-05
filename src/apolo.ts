import {ApolloClient, InMemoryCache} from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: 'https://movies-gql.herokuapp.com/graphql',
    cache: new InMemoryCache(),
});