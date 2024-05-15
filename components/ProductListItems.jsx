import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { colors } from "../styles/styles";
import MyModal from "../components/MyModal";
import { backgroundColor, textColors } from "../assets/colors/colors";

const ProductListItems = ({
  navigate,
  deleteHandler,
  i,
  id,
  price,
  stock,
  name,
  category,
  imgSrc,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={() => setOpenModal((prev) => !prev)}
        onPress={() => navigate.navigate("productdetails", { id })}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor: i % 2 === 0 ? colors.color2 : colors.color3,
          }}
        >
          <Text
            style={{
              ...styles.text,
              backgroundColor: i % 2 === 0 ? colors.color3 : colors.color1,
            }}
          >
            ID - #{id}
          </Text>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View>
              <TextBox title={"Name"} value={name} i={i} />
              <TextBox title={"Price"} value={price} i={i} />
              <TextBox title={"Category"} value={category} i={i} />
              <TextBox title={"Stock"} value={stock} i={i} />
            </View>
            <View style={{marginLeft: 'auto'}}>
              <Image
                source={{
                  uri: imgSrc,
                }}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {openModal && (
        <MyModal
          id={id}
          deleteHandler={deleteHandler}
          navigate={navigate}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

const TextBox = ({ title, value, i }) => (
  <Text
    style={{
      marginVertical: 6,
      color: i % 2 === 0 ? colors.color3 : colors.color2,
    }}
  >
    <Text style={{ fontWeight: "900" }}>{title} - </Text>
    {`${value} ${title === "Price" ? "VND" : ""}`}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  text: {
    color: colors.color2,
    fontSize: 16,
    fontWeight: "900",
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default ProductListItems;
