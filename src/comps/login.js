import React, { useState } from "react";

import { Input, Button } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import MyHeader from "./header.js";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { AsyncStorage } from "react-native";

const LOGINQUERY = gql`
  mutation LoginMutation($userLogin: UserLogin!) {
    login(input: $userLogin) {
      token
      user {
        id
        username
        conversations
      }
    }
  }
`;

const saveJwt = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

const LoginForm = props => {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [loginQuery] = useMutation(LOGINQUERY);

  const handleUsernameInput = text => {
    setCreds({ ...creds, username: text });
  };

  const handlePasswordInput = text => {
    setCreds({ ...creds, password: text });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const returned = await loginQuery({
        variables: {
          userLogin: { username: creds.username, password: creds.password }
        }
      });
      const token = returned.data.login.token;
      const user = returned.data.login.user;
      console.log(user);
      saveJwt("token", token);
      props.screenProps.setJwtLogin({ token: token, user: user });
      props.navigation.navigate("Home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <MyHeader
        phrase="This is a test"
        pageChange={props.navigation.navigate}
      />
      <View style={styles.innerContainer}>
        <Input placeholder="Username" onChangeText={handleUsernameInput} />
        <Input
          placeholder="Password"
          textContentType="password"
          secureTextEntry
          onChangeText={handlePasswordInput}
        />
      </View>
      <View style={styles.innerContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  innerContainer: {
    margin: 30
  }
});
