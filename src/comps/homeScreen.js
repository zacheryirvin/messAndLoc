import React, { useEffect } from "react";
import { Button, ThemeProvider, Text } from "react-native-elements";
import MyHeader from "./header.js";
import MessagesScreen from "./messScreen.js";
import MapScreen from "./map.js";
import LoginForm from "./login.js";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const theme = {
  Button: {
    raised: true
  }
};

const HomeScreen = props => {
  return (
    <ThemeProvider theme={theme}>
      <MyHeader
        phrase="This is a test"
        pageChange={props.navigation.navigate}
      />
      <Text>The Tracking App</Text>
      <Button title="Test" />
    </ThemeProvider>
  );
};

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Messages: MessagesScreen,
    Map: MapScreen,
    Login: LoginForm
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
