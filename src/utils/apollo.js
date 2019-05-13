import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

export const client = new ApolloClient({
    uri: "https://api.hexiao-o.com/blog_web/graphql",
});

export default class Apollo extends React.PureComponent {
    render() {
        const { children } = this.props;
        return <ApolloProvider client={client}>{children}</ApolloProvider>
    }
}