import React from "react";
import AppNavigator from "./src/comps/homeScreen.js";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://zachsgraphqldb.herokuapp.com/"
  }),
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  );
};

export default App;
