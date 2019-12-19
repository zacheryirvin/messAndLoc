import React, { useState, useEffect } from "react";
import AppNavigator from "./src/comps/homeScreen.js";
import { ApolloProvider } from "@apollo/react-hooks";
import { AsyncStorage } from "react-native";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-boost";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const httpLink = new HttpLink({
  uri: "https://zachsgraphqldb.herokuapp.com/"
});
const getJwt = async key => {
  try {
    const token = await AsyncStorage.getItem(key);
    return token;
  } catch (error) {
    console.log(error);
  }
};

const App = () => {
  const [jwt, setJwt] = useState({
    token: "",
    user: ""
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getJwt("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  const link = authLink.concat(httpLink);

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
  });

  const setJwtLogin = jwt => {
    setJwt(jwt);
  };

  return (
    <ApolloProvider client={client}>
      <AppNavigator
        screenProps={{
          setJwtLogin: setJwtLogin,
          jwt: jwt
        }}
      />
    </ApolloProvider>
  );
};

export default App;
