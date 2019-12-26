import React, { useEffect } from "react";
import { Button, ThemeProvider, Text } from "react-native-elements";
import MyHeader from "./header.js";
import MessagesScreen from "./messScreen.js";
import MapScreen from "./map.js";
import LoginForm from "./login.js";
import ConversationScreen from "./conversationScreen.js";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const theme = {
  Button: {
    raised: true
  }
};

const LOGGEDIN = gql`
  {
    user {
      id
      username
      conversations
    }
  }
`;

const HomeScreen = props => {
  const { loading, error, data } = useQuery(LOGGEDIN);
  useEffect(() => {}, [data]);
  if (error) {
    // console.log(error.graphQLErrors);
    return (
      <>
        <MyHeader
          phrase="This is a test"
          pageChange={props.navigation.navigate}
        />
        <Text>Please Login</Text>
      </>
    );
  }
  if (loading) {
    // console.log("loading");
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }
  if (data) {
    if (props.screenProps.jwt.user.username !== data.user.username) {
      props.screenProps.setJwtLogin({
        ...props.screenProps.jwt,
        user: data.user
      });
    }
    return (
      <ThemeProvider theme={theme}>
        <MyHeader
          phrase="This is a test"
          pageChange={props.navigation.navigate}
          screenProps={props.screenProps}
        />
        <Text>Welcome {props.screenProps.jwt.user.username}</Text>
      </ThemeProvider>
    );
  }
};

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Messages: MessagesScreen,
    Map: MapScreen,
    Login: LoginForm,
    Conversation: ConversationScreen
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
