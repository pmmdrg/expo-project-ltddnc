import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../styles/styles';
import MyModal from '../components/MyModal';
import { backgroundColor, textColors } from '../assets/colors/colors';

const ProductListItem = ({
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
        onPress={() => navigate.navigate('productdetails', { id })}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor: backgroundColor.secondaryBackground,
          }}
        >
          <Image
            source={{
              uri: imgSrc,
            }}
            style={{
              width: 40,
              height: 40,
              marginEnd: 20,
              resizeMode: 'contain',
            }}
          />

          <Text
            style={{
              width: 60,
              color: textColors.primaryText,
              paddingEnd: 5,
            }}
            numberOfLines={1}
          >
            {price}VND
          </Text>

          <Text
            style={{
              width: 110,
              color: textColors.primaryText,
              paddingEnd: 5,
            }}
            numberOfLines={1}
          >
            {name}
          </Text>

          <Text
            style={{
              width: 80,
              color: textColors.primaryText,
              paddingEnd: 5,
            }}
            numberOfLines={1}
          >
            {category}
          </Text>

          <Text
            style={{
              width: 70,
              color: textColors.primaryText,
              paddingEnd: 5,
            }}
            numberOfLines={1}
          >
            {stock}
          </Text>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default ProductListItem;
