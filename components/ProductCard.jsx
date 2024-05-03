import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import { Button } from 'react-native-paper';
import {
  backgroundColor,
  buttonColors,
  textColors,
} from '../assets/colors/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../redux/actions/productAction';

const ProductCard = ({
  stock,
  name,
  price,
  image,
  id,
  addToCardHandler,

  navigate,
}) => {
  const { user } = useSelector((state) => state.user);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.prod}
      onPress={() => {
        navigate.navigate('productdetails', { id });
      }}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.prodImage}
        />
        <View style={styles.prodInfo}>
          <Text numberOfLines={2} style={styles.prodName}>
            {name}
          </Text>
          <Text style={styles.prodPrice}>{price} VND</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: buttonColors.primaryButton,
            paddingVertical: 5,
            width: '100%',
            marginTop: 15,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            position: 'absolute',
            bottom: 0,
          }}
        >
          <Button
            onPress={
              user
                ? () => addToCardHandler(id, name, price, image, stock)
                : () =>
                    Toast.show({
                      type: 'error',
                      text1: 'Vui lòng đăng nhập',
                    })
            }
            textColor={textColors.whiteText}
          >
            Thêm Vào Giỏ Hàng
          </Button>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  prod: {
    paddingHorizontal: 10,
    height: 300,
  },
  container: {
    width: 160,
    height: '100%',
    maxHeight: 300,
    alignItems: 'center',
    backgroundColor: backgroundColor.secondaryBackground,
    borderRadius: 10,
    paddingTop: 15,
    position: 'relative',
  },
  prodInfo: { width: 130, marginTop: 20 },
  prodImage: {
    width: 130,
    height: 130,
  },
  prodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: textColors.primaryText,
    marginBottom: 4,
  },
  prodPrice: { fontSize: 14, fontWeight: 'bold', color: textColors.redText },
});

export default ProductCard;
