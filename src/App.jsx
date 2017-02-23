
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
      connectionParams: { randomId: Math.floor(Math.random() * 10000) },
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

		this.setUser = this._setUser.bind(this);
		this.setAuthorId = this._setAuthorId.bind(this);

		this.state = {
			authorId: null,
			firstName: null,
			lastName: null,
		};
  }

	_setUser(firstName, lastName) { this.setState({ firstName, lastName }); }

	_setAuthorId(authorId) { this.setState({ authorId }); }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <PostList
					setAuthorId={this.setAuthorId}
					setUser={this.setUser}
					{...this.state}
				/>
      </ApolloProvider>
    );
  }
}
