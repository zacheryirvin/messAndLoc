import React from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import MyHeader from "./header.js";
import { gql } from "apollo-boost";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";

// const CONVERSATION = gql`
//   subscription GetConversation($id: String!) {
//     currentConversation(input: { toId: $id }) {
//       fromId
//       toId
//       message
//     }
//   }
// `;

const CONVERSATION = gql`
  subscription {
    currentConversation(input: { toId: "1" }) {
      message
    }
  }
`;

const ConversationScreen = props => {
  // const id = String(props.screenProps.jwt.conversationId);
  // const { loading, error, data } = useSubscription(CONVERSATION, {
  //   variables: { id }
  // });
  const { loading, error, data } = useSubscription(CONVERSATION);
  if (loading) return null;
  if (error) {
    console.log(error);
    return "Error";
  }

  return (
    <View>
      <MyHeader
        phrase="This is a test"
        pageChange={props.navigation.navigate}
      />
      {data.conversation.map((x, i) => {
        return <ListItem key={i} title={x.message} bottomDivider />;
      })}
    </View>
  );
};

export default ConversationScreen;
