import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { formatPrice } from '../utils/format';

import Header from '../components/Header';
import Heading from '../components/Heading';
import ConfirmOrderItem from '../components/ConfirmOrderItem';

import { colors, defaultStyle } from '../styles/styles';

const ConfirmOrder = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [itemsPrice] = useState(
    cartItems.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
  );
  const [shippingCharges] = useState(itemsPrice > 10000 ? 0 : 200);
  const [tax] = useState(Number((0.18 * itemsPrice).toFixed()));
  const [totalAmount] = useState(itemsPrice + shippingCharges + tax);

  const navigate = useNavigation();

  return (
    <View style={[defaultStyle, { paddingHorizontal: 10 }]}>
      <Header back={true} />
      {/* Heading */}
      <Heading
        containerStyle={{
          paddingTop: 70,
        }}
        text1='Xác nhận'
        text2='Đơn hàng'
      />
      <View
        style={{
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <ScrollView>
          {cartItems.map((i) => (
            <ConfirmOrderItem
              key={i.product}
              price={i.price}
              image={i.image}
              name={i.name}
              quantity={i.quantity}
            />
          ))}
        </ScrollView>
      </View>
      <PriceTag heading={'Giá trị đơn hàng'} value={itemsPrice} />
      <PriceTag heading={'Phí vận chuyển'} value={shippingCharges} />
      <PriceTag heading={'Thuế'} value={tax} />
      <PriceTag heading={'Tổng cộng'} value={totalAmount} />
      <TouchableOpacity
        onPress={() =>
          navigate.navigate('payment', {
            itemsPrice,
            shippingCharges,
            tax,
            totalAmount,
          })
        }
      >
        <Button
          style={{
            backgroundColor: colors.color3,
            borderRadius: 100,
            padding: 5,
            margin: 10,
          }}
          textColor={colors.color2}
          icon={'chevron-right'}
        >
          Phương thức thanh toán
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const PriceTag = ({ heading, value }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
      }}
    >
      <Text style={{ fontWeight: '800' }}>{heading}</Text>
      <Text>{formatPrice(value)}</Text>
    </View>
  );
};

export default ConfirmOrder;
