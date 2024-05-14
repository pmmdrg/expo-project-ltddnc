import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { colors, defaultStyle, formHeading } from '../styles/styles';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { Headline } from 'react-native-paper';
import OrderItem from '../components/OrderItem';
import { useGetOrders } from '../utils/hooks';
import { useIsFocused } from '@react-navigation/native';

const statusMaps = {
  Shipped: 'Vận chuyển',
  Delivered: 'Đã giao',
  Preparing: 'Đang chuẩn bị',
};

const Orders = () => {
  const isFocused = useIsFocused();
  const { loading, orders } = useGetOrders(isFocused);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          ...defaultStyle,
          backgroundColor: colors.color5,
        }}
      >
        <Header back={true} />

        {loading ? (
          <Loader />
        ) : (
          <View
            style={{
              padding: 10,
              flex: 1,
            }}
          >
            <View style={{ marginBottom: 20, paddingTop: 70 }}>
              <Text style={formHeading}>Đơn hàng</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {orders.length > 0 ? (
                orders.map((item, index) => (
                  <OrderItem
                    key={item._id}
                    id={item._id}
                    i={index}
                    price={item.totalAmount}
                    status={statusMaps[item.orderStatus]}
                    paymentMethod={item.paymentMethod}
                    orderedOn={item.createdAt.split('T')[0]}
                    address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country} ${item.shippingInfo.pinCode}`}
                  />
                ))
              ) : (
                <Headline style={{ textAlign: 'center' }}>
                  Chưa có đơn hàng nào
                </Headline>
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Orders;
