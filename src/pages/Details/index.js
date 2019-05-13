import React from 'react';
import { View, Text, Button } from 'react-native';
import { gql } from 'apollo-boost';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { Query } from "react-apollo";
import { StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

class DetailsScreen extends React.Component {
    render() {
        console.log(this.props, 111)
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Query
                    query={
                        gql`query{
                            posts_list(query: { current: 1, pageSize: 10 }){
                            title,
                            createTime,
                            intro,
                            content
                            }
                        }`
                    }
                >
                    {(result) => {
                        const { loading, error, data = {} } = result;
                        console.log(data)
                        return null
                    }}
                </Query>
                <Button
                    title="Go to Home"
                    onPress={() => {
                        this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({
                                    routeName: 'Main',
                                    action: NavigationActions.navigate({ routeName: 'Home' })
                                })
                            ],
                        }))
                    }}
                />
            </View>
        );
    }
}

export default connect(({ app }) => {
    return { app };
})(withApollo(DetailsScreen))