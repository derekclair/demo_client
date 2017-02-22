
import React, { Component } from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import {
  SubscriptionClient,
  addGraphQLSubscriptions,
} from 'subscriptions-transport-ws';
import { ApolloProvider } from 'react-apollo';

import './App.css';


import PostList from './PostList';

export default class App extends Component {
  constructor(...args) {
    super(...args);

    const wsClient = new SubscriptionClient('ws://localhost:8090', {
      reconnect: true,
      connectionParams: {
        // Pass any arguments you want for initialization
      },
    });

    const networkInterface = createNetworkInterface({
      uri: 'http://localhost:8080/graphql',
    });

    const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient);

    this.client = new ApolloClient({
      networkInterface: networkInterfaceWithSubscriptions,
      connectToDevTools: true,
      dataIdFromObject: (r) => (r.id),
    });
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        <PostList />
      </ApolloProvider>
    );
  }
}
