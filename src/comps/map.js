import React from "react";
import { View, Text } from "react-native";
import MyHeader from "./header.js";

const MapScreen = props => {
  return (
    <View>
      <MyHeader
        phrase="This is a test"
        pageChange={props.navigation.navigate}
      />
      <Text> This will be the map screen </Text>
    </View>
  );
};

export default MapScreen;
