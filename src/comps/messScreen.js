import React, { useState } from "react";
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Modal
} from "react-native";
import { ListItem } from "react-native-elements";
import MyHeader from "./header.js";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

// const CONVERSATION = gql`
//   query TwoPeopleConv($id: String!) {
//     conversation(input: { toId: $id }) {
//       id
//       fromId
//       toId
//       message
//     }
//   }
// `;

// const CONVERSATION = gql`
//   {
//     conversation(input: { toId: "1" }) {
//       id
//       fromId
//       toId
//       message
//     }
//   }
// `;

const MessagesScreen = props => {
  return (
    <View>
      <MyHeader
        phrase="This is a test"
        pageChange={props.navigation.navigate}
      />
      {props.screenProps.jwt.user.conversations.map((x, i) => {
        x = JSON.parse(x);
        return (
          <ListItem
            key={i}
            title={x.username}
            bottomDivider
            onPress={() => {
              props.screenProps.setJwtLogin({
                ...props.screenProps.jwt,
                conversationId: x.id
              });
              props.navigation.navigate("Conversation");
            }}
          />
        );
      })}
    </View>
  );
};

export default MessagesScreen;
