import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import { Avatar, Button } from 'react-native-paper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getProductDetails } from '../redux/actions/productAction';
import {
  backgroundColor,
  buttonColors,
  textColors,
} from '../assets/colors/colors';
import CommentItem from '../components/CommentItem';

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

const ProductDetails = ({ route: { params } }) => {
  const {
    product: { name, price, stock, description, images, comments },
  } = useSelector((state) => state.product);

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
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: images && images[0]?.url }}
            style={{ width: 300, height: 300, marginTop: 40 }}
          />
        </View>
        <View
          style={{
            backgroundColor: colors.color2,
            padding: 35,
            flex: 1,
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
              Số lượng
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
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={incrementQty}>
                <Avatar.Icon icon={'plus'} {...iconOptions} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.9} onPress={addToCardHandler}>
            <Button icon={'cart'} style={styles.btn} textColor={colors.color2}>
              <Text>Thêm vào giỏ hàng</Text>
            </Button>
          </TouchableOpacity>
          <View>
            <Text style={styles.comment}>
              {comments?.length !== 0
                ? `${comments.length} bình luận:`
                : `Bình luận`}
            </Text>
            <CommentItem comments={comments} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.cmtInputContainer}>
        <TextInput
          placeholder='Nhập bình luận của bạn'
          style={styles.cmtInput}
        />
        <TouchableOpacity>
          <Text style={styles.cmtSubmit}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  comment: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cmtInputContainer: {
    height: 70,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cmtInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: backgroundColor.primaryBackground,
    borderRadius: 20,
    fontSize: 16,
    marginHorizontal: 20,
    width: '70%',
  },
  cmtSubmit: {
    padding: 15,
    backgroundColor: buttonColors.primaryButton,
    borderRadius: 20,
    color: textColors.whiteText,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default ProductDetails;
