import React, { useState, useEffect } from "react";
import AppNavigator from "./src/comps/homeScreen.js";
import { ApolloProvider } from "@apollo/react-hooks";
import { AsyncStorage } from "react-native";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-boost";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

const httpLink = new HttpLink({
  // uri: "https://zachsgraphqldb.herokuapp.com/"
  uri: "http://localhost:8000/"
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
  const token = getJwt("token");
  token.then(data => {
    if (jwt.token !== data) {
      console.log("ran");
      setJwt({ ...jwt, token: data });
    }
  });

  const wsLink = new WebSocketLink({
    // uri: "ws://zachsgraphqldb.herokuapp.com/",
    uri: "ws://localhost:8000/",
    options: {
      reconnect: true,
      timeout: 20000,
      lazy: true,
      connectionParams: {
        authToken: jwt.token
      }
    }
  });
  console.log(wsLink);

  const authLink = setContext(async (_, { headers }) => {
    const token = await getJwt("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      console.log(definition);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    authLink.concat(httpLink),
    authLink.concat(httpLink)
  );

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
