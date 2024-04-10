import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { colors } from "../styles/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { StyleSheet } from "react-native";
import { backgroundColor } from "../assets/colors/colors";

const Header = ({ back, emptyCart = false }) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const emptyCartHandler = () => {
    dispatch({
      type: "clearCart",
    });
  };

  return (
    <View style={styles.container}>
      {back && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigate.goBack()}
        >
          <Image source={require("../assets/icons/back.png")} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.cartButton}
        onPress={emptyCart ? emptyCartHandler : () => navigate.navigate("cart")}
      >
        <Image source={require("../assets/icons/cart.png")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor.primaryBackground,
    height: 70,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 20,
    zIndex: 100,
    padding: 10,
  },
  cartButton: {
    position: "absolute",
    right: 20,
    top: 20,
    zIndex: 10,
    padding: 10,
  },
});

export default Header;
