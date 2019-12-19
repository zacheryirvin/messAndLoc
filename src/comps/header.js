import React, { useState } from "react";
import { Header } from "react-native-elements";
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Button,
  Modal,
  AsyncStorage
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBars,
  faSignInAlt,
  faSignOutAlt,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";

const MyHeader = props => {
  const [showMenu, setShowMenu] = useState(false);

  const signout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      props.screenProps.setJwtLogin({ token: "", username: "" });
      props.pageChange("Login");
    } catch (err) {
      console.log(error);
    }
  };
  const LeftHeader = () => {
    return (
      <>
        <TouchableHighlight onPress={() => setShowMenu(!showMenu)}>
          <View>
            <FontAwesomeIcon style={{ color: "#fff" }} icon={faBars} />
          </View>
        </TouchableHighlight>
      </>
    );
  };

  const RightHeader = () => {
    if (props.screenProps) {
      return (
        <>
          <TouchableHighlight onPress={signout}>
            <View>
              <FontAwesomeIcon style={{ color: "#fff" }} icon={faSignOutAlt} />
            </View>
          </TouchableHighlight>
        </>
      );
    }
    return (
      <>
        <TouchableHighlight onPress={() => props.pageChange("Login")}>
          <View>
            <FontAwesomeIcon style={{ color: "#fff" }} icon={faSignInAlt} />
          </View>
        </TouchableHighlight>
      </>
    );
  };

  const Close = () => {
    return (
      <>
        <TouchableHighlight onPress={() => setShowMenu(!showMenu)}>
          <View style={{ marginLeft: 15, marginTop: 15 }}>
            <FontAwesomeIcon icon={faWindowClose} size={50} />
          </View>
        </TouchableHighlight>
      </>
    );
  };

  return (
    <>
      <Header
        leftComponent={<LeftHeader />}
        centerComponent={{ text: props.phrase, style: { color: "#fff" } }}
        rightComponent={<RightHeader />}
      />
      <Modal animationType={"slide"} transparent={false} visible={showMenu}>
        <Close />
        <View style={{ flex: 1, justifyContent: "center", paddingBottom: 100 }}>
          <Button
            title="Home"
            onPress={() => {
              props.pageChange("Home");
              setShowMenu(!showMenu);
            }}
          />
          <Button
            title="Messages"
            onPress={() => {
              props.pageChange("Messages");
              setShowMenu(!showMenu);
            }}
          />
          <Button
            title="Map"
            onPress={() => {
              props.pageChange("Map");
              setShowMenu(!showMenu);
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  listItems: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  singleItem: {
    flex: 1
  }
});
