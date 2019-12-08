import React, { ReactElement } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

export const client = new ApolloClient({
    uri: "https://api.hexiao-o.com/blog_web/graphql",
});

interface ApolloProps {
    children: ReactElement,
}
export default class ApolloRoot extends React.PureComponent<ApolloProps, {}> {
    render() {
        const { children } = this.props;
        return <ApolloProvider client={client}>{children}</ApolloProvider>
    }
}