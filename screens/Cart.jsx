import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import CartItem from '../components/CartItem';

import { colors, defaultStyle } from '../styles/styles';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigation();

  const dispatch = useDispatch();

  const incrementHandler = (id, name, price, image, stock, quantity) => {
    const newQty = quantity + 1;

    if (stock <= quantity) {
      return Toast.show({
        type: 'error',
        text1: 'Đạt giá trị tối đa',
      });
    }

    dispatch({
      type: 'addToCart',
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: newQty,
      },
    });
  };

  const decrementHandler = (id, name, price, image, stock, quantity) => {
    const newQty = quantity - 1;

    if (1 >= quantity) {
      return dispatch({ type: 'removeFromCart', payload: id });
    }

    dispatch({
      type: 'addToCart',
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: newQty,
      },
    });
  };

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >
      {/* Header */}
      <Header back={true} emptyCart={true} />
      {/* Heading */}
      <Text
        style={{
          fontSize: 24,
          paddingHorizontal: 20,
        }}
      >
        Giỏ hàng
      </Text>
      <View
        style={{
          paddingVertical: 30,
          flex: 1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartItems.length > 0 ? (
            cartItems.map((i, index) => (
              <CartItem
                navigate={navigate}
                key={i.product}
                id={i.product}
                name={i.name}
                stock={i.stock}
                amount={i.price}
                imgSrc={i.image}
                index={index}
                qty={i.quantity}
                incrementhandler={incrementHandler}
                decrementHandler={decrementHandler}
              />
            ))
          ) : (
            <Text style={{ textAlign: 'center', fontSize: 18 }}>
              Chưa có sản phẩm trong giỏ hàng
            </Text>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
      >
        <Text>{cartItems.length} sản phẩm</Text>
        <Text>
          {cartItems.reduce(
            (prev, curr) => prev + curr.quantity * curr.price,
            0
          )}
          VND
        </Text>
      </View>

      <TouchableOpacity
        onPress={
          cartItems.length > 0 ? () => navigate.navigate('confirmorder') : null
        }
      >
        <Button
          style={{
            backgroundColor: colors.color3,
            borderRadius: 100,
            padding: 5,
            marginVertical: 30,
            marginHorizontal: 20,
          }}
          icon={'cart'}
          textColor={colors.color2}
        >
          Thanh toán
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;
