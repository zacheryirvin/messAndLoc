import React from "react";
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Modal
} from "react-native";
import MyHeader from "./header.js";

const MessagesScreen = props => {
  return (
    <View>
      <MyHeader
        phrase="This is a test"
        pageChange={props.navigation.navigate}
      />
      <Text>Some Messages</Text>
    </View>
  );
};

export default MessagesScreen;
