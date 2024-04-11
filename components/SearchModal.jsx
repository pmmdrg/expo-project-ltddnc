import React, { startTransition, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  TextInput,
  StyleSheet,
} from "react-native";
import { Headline } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import {
  backgroundColor,
  borderColor,
  textColors,
} from "../assets/colors/colors";
import { colors } from "../styles/styles";

const SearchModal = ({
  searchQuery,
  setActiveSearch,
  setSearchQuery,
  products = [],
}) => {
  const navigate = useNavigation();

  const backAction = () => {
    setSearchQuery("");
    setActiveSearch(false);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={backAction} style={styles.backButton}>
            <Image source={require("../assets/icons/back.png")} />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Tìm kiếm tên sản phẩm"
              value={searchQuery}
              onChangeText={(query) => setSearchQuery(query)}
              style={styles.input}
            />
            <Image source={require("../assets/icons/search.png")} />
          </View>
        </View>

        <ScrollView>
          <View
            style={{
              paddingVertical: 40,
              paddingHorizontal: 10,
            }}
          >
            {products.map((i) => (
              <SearchItem
                key={i._id}
                imgSrc={i.images[0]?.url}
                name={i.name}
                price={i.price}
                handler={() =>
                  navigate.navigate("productdetails", { id: i._id })
                }
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const SearchItem = ({ price, name, imgSrc, handler }) => (
  <TouchableOpacity onPress={handler}>
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.color2,
        elevation: 5,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        marginVertical: 30,
      }}
    >
      <Image
        source={{
          uri: imgSrc,
        }}
        style={{
          width: 80,
          height: 80,
          position: "absolute",
          resizeMode: "contain",
          top: -15,
          left: 10,
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      />

      <View style={{ width: "80%", paddingHorizontal: 30 }}>
        <Text numberOfLines={1}>{name}</Text>
        <Headline
          numberOfLines={1}
          style={{
            fontWeight: "900",
          }}
        >
          {price} VND
        </Headline>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "120%",
    position: "absolute",
    top: 0,
    zIndex: 100,
    backgroundColor: colors.color2,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    paddingLeft: 20,
    flexGrow: 1,
  },
  searchContainer: {
    backgroundColor: backgroundColor.secondaryBackground,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 30,
    marginHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    flexGrow: 12,
  },
  input: {
    backgroundColor: backgroundColor.transparentBackground,
    fontSize: 14,
    flex: 1,
  },
});

export default SearchModal;
