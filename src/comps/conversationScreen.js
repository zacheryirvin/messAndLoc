import React, { useEffect } from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import MyHeader from "./header.js";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

// const CONVERSATION = gql`
//   subscription {
//     currentConversation {
//       fromId
//       toId
//       message
//     }
//   }
// `;

const INITALCONVERSATION = gql`
  query GetConvo($id: String!) {
    conversation(input: { toId: $id }) {
      id
      fromId
      toId
      message
    }
  }
`;

const ConversationScreen = props => {
  const id = String(props.screenProps.jwt.conversationId);
  // const { loading, error, data } = useQuery(INITALCONVERSATION, {
  //   variables: {
  //     id
  //   }
  // });
  const query = useQuery(INITALCONVERSATION, {
    variables: {
      id
    }
  });
  // const { loading, error, data } = useSubscription(CONVERSATION);
  // useEffect(() => {}, [data]);
  if (query.loading) return null;
  if (query.error) return `Error! ${error}`;

  return (
    <View>
      <MyHeader
        phrase="This is a test"
        pageChange={props.navigation.navigate}
      />
      {query.data.conversation.map(x => {
        return <ListItem key={x.id} title={x.message} />;
      })}
    </View>
  );
};

export default ConversationScreen;
