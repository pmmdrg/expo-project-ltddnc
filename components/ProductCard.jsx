import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

import { formatPrice } from '../utils/format';

import {
  backgroundColor,
  buttonColors,
  textColors,
} from '../assets/colors/colors';

const ProductCard = ({
  stock,
  name,
  price,
  image,
  id,
  addToCartHandler,
  navigate,
  avgScore,
}) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

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
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.prodPrice}>{formatPrice(price)}</Text>
            {avgScore && (
              <View style={styles.voteInfo}>
                <Text style={styles.vote}>{avgScore}</Text>
                <Image
                  style={styles.voteIcon}
                  source={require('../assets/icons/star.png')}
                />
              </View>
            )}
          </View>
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
              isAuthenticated
                ? () => addToCartHandler(id, name, price, image, stock)
                : () =>
                    Toast.show({
                      type: 'error',
                      text1: 'Vui lòng đăng nhập',
                    })
            }
            textColor={textColors.whiteText}
          >
            {stock === 0 ? (
              <Text>Hết hàng</Text>
            ) : (
              <Text>Thêm Vào Giỏ Hàng</Text>
            )}
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
  voteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vote: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  voteIcon: {
    height: 16,
    width: 16,
  },
});

export default ProductCard;
