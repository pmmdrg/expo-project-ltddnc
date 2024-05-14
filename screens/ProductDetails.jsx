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
import { postComment } from '../redux/actions/otherAction';
import { Picker } from '@react-native-picker/picker';

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
    product: { name, price, stock, description, images, comments, avgScore },
  } = useSelector((state) => state.product);
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState('');
  const [vote, setVote] = useState(0);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const incrementQty = () => {
    if (stock <= quantity)
      return Toast.show({
        type: 'error',
        text1: 'Đạt giá trị tối đa',
      });
    setQuantity((prev) => prev + 1);
  };
  const decrementQty = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  const addToCartHandler = () => {
    if (!isAuthenticated) {
      return Toast.show({
        type: 'error',
        text1: 'Vui lòng đăng nhập',
      });
    }
    if (stock === 0)
      return Toast.show({
        type: 'error',
        text1: 'Hết hàng',
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
      text1: 'Đã thêm vào giỏ hàng',
    });
  };

  const handleSubmitComment = () => {
    if (!isAuthenticated) {
      return Toast.show({
        type: 'error',
        text1: 'Vui lòng đăng nhập để bình luận',
      });
    }
    if (comment === '' || vote === 0) {
      return Toast.show({
        type: 'error',
        text1: 'Vui lòng nhập bình luận và đánh giá',
      });
    }
    if (!loading) {
      dispatch(postComment(params.id, comment, vote));
    }
    setComment('');
    setVote(0);
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
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '900',
              }}
            >
              {price} VND
            </Text>
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
          <TouchableOpacity activeOpacity={0.9} onPress={addToCartHandler}>
            {stock === 0 ? (
              <Button style={styles.btn} textColor={colors.color2}>
                <Text>Hết hàng</Text>
              </Button>
            ) : (
              <Button
                icon={'cart'}
                style={styles.btn}
                textColor={colors.color2}
              >
                <Text>Thêm vào giỏ hàng</Text>
              </Button>
            )}
          </TouchableOpacity>
          <View>
            <Text style={styles.comment}>
              {comments?.length !== 0
                ? `${comments?.length} bình luận:`
                : `Bình luận:`}
            </Text>
            <CommentItem comments={comments} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.cmtInputContainer}>
        <View style={styles.cmtInputVote}>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder='Nhập bình luận của bạn'
            style={styles.cmtInput}
          />
          <Picker
            selectedValue={vote}
            onValueChange={(value, index) => setVote(value)}
            style={styles.cmtPicker}
          >
            <Picker.Item
              label='Chưa đánh giá'
              value={0}
              style={styles.pickerItem}
            />
            <Picker.Item label='1 sao' value={1} style={styles.pickerItem} />
            <Picker.Item label='2 sao' value={2} style={styles.pickerItem} />
            <Picker.Item label='3 sao' value={3} style={styles.pickerItem} />
            <Picker.Item label='4 sao' value={4} style={styles.pickerItem} />
            <Picker.Item label='5 sao' value={5} style={styles.pickerItem} />
          </Picker>
        </View>
        <TouchableOpacity
          onPress={handleSubmitComment}
          style={styles.cmtSubmit}
        >
          <Text
            style={{
              color: textColors.whiteText,
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            Đăng
          </Text>
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
  voteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vote: {
    fontSize: 16,
    marginRight: 5,
  },
  voteIcon: {
    height: 20,
    width: 20,
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
    height: 140,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cmtInputVote: {
    alignItems: 'center',
    flex: 4,
    marginLeft: 20,
    marginRight: 10,
  },
  cmtInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: backgroundColor.primaryBackground,
    borderRadius: 20,
    fontSize: 16,
    width: '100%',
  },
  cmtPicker: {
    width: '70%',
    borderRadius: 20,
  },
  pickerItem: {
    borderRadius: 20,
  },
  cmtSubmit: {
    padding: 15,
    backgroundColor: buttonColors.primaryButton,
    borderRadius: 20,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 20,
  },
});
export default ProductDetails;
