import React, { useState } from "react";
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
  const [jwt, setJwt] = useState("");
  const setJwtLogin = jwt => {
    setJwt(jwt);
  };

  return (
    <ApolloProvider client={client}>
      <AppNavigator screenProps={{ setJwtLogin: setJwtLogin, jwt: jwt }} />
    </ApolloProvider>
  );
};

export default App;
