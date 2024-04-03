import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import Carousel from 'react-native-snap-carousel';
import { Avatar, Button } from 'react-native-paper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getProductDetails } from '../redux/actions/productAction';
import { backgroundColor } from '../assets/colors/colors';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH;
export const iconOptions = {
  size: 20,
  style: {
    borderRadius: 5,
    backgroundColor: colors.color5,
    height: 25,
    width: 25,
  },
};

const products = {
  product: {
    id: 1,
    name: 'Headphone',
    price: 500000,
    stock: 0,
    rate: 4.5,
    rateCount: 80,
    images: require('../assets/images/headphone.png'),
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit sed vitae similique ducimus tenetur pariatur eius aspernatur voluptatibus molestiae a atque qui, corporis nam ab, dolore optio impedit aliquid rerum.',
  },
};

const ProductDetails = ({ route: { params } }) => {
  const {
    product: { name, price, stock, description, images },
  } = useSelector((state) => state.product); // products;

  const isCarousel = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const incrementQty = () => {
    if (stock <= quantity)
      return Toast.show({
        type: 'error',
        text1: 'Maximum Value Added',
      });
    setQuantity((prev) => prev + 1);
  };
  const decrementQty = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  const addToCardHandler = () => {
    if (stock === 0)
      return Toast.show({
        type: 'error',
        text1: 'Out Of Stock',
      });
    dispatch({
      type: 'addToCart',
      payload: {
        product: params.id,
        name,
        price,
        image: images[0]?.url,
        stock,
        quantity,
      },
    });
    Toast.show({
      type: 'success',
      text1: 'Added To Cart',
    });
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, isFocused]);

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
        backgroundColor: backgroundColor.secondaryBackground,
      }}
    >
      <Header back={true} />

      {/* Carousel */}
      {/* <Carousel
        layout='stack'
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        ref={isCarousel}
        data={images}
        renderItem={CarouselCardItem}
      /> */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={images}
          style={{ width: 300, height: 300, marginTop: 40 }}
        />
      </View>

      <View
        style={{
          backgroundColor: colors.color2,
          padding: 35,
          flex: 1,
          // marginTop: -380,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            fontSize: 25,
          }}
        >
          {name}
        </Text>

        <Text
          style={{
            fontSize: 18,
            fontWeight: '900',
          }}
        >
          {price} VND
        </Text>

        <Text
          style={{
            letterSpacing: 1,
            lineHeight: 20,
            marginVertical: 15,
          }}
          numberOfLines={8}
        >
          {description}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}
        >
          <Text
            style={{
              color: colors.color3,
              fontWeight: '100',
            }}
          >
            Quantity
          </Text>

          <View
            style={{
              width: 80,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={decrementQty}>
              <Avatar.Icon icon={'minus'} {...iconOptions} />
            </TouchableOpacity>

            <Text style={style.quantity}>{quantity}</Text>

            <TouchableOpacity onPress={incrementQty}>
              <Avatar.Icon icon={'plus'} {...iconOptions} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.9} onPress={addToCardHandler}>
          <Button icon={'cart'} style={style.btn} textColor={colors.color2}>
            Add To Cart
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CarouselCardItem = ({ item, index }) => (
  <View style={style.container} key={index}>
    <Image source={{ uri: item.url }} style={style.image} />
  </View>
);

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.color1,
    width: ITEM_WIDTH,
    paddingVertical: 40,
    height: 380,
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: 'contain',
    height: 250,
  },
  quantity: {
    backgroundColor: colors.color4,
    height: 25,
    width: 25,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color5,
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    padding: 5,
    marginVertical: 35,
  },
});
export default ProductDetails;
