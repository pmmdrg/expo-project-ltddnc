import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Headline } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

import { useGetOrders } from '../utils/hooks';

import Header from '../components/Header';
import Loader from '../components/Loader';
import OrderItem from '../components/OrderItem';
import Pagination from '../components/Pagination';

import { colors, defaultStyle, formHeading } from '../styles/styles';

const statusMaps = {
  Shipped: 'Vận chuyển',
  Delivered: 'Đã giao',
  Preparing: 'Đang chuẩn bị',
};

const paymentMaps = {
  ONLINE: 'Trực tuyến',
  COD: 'Thanh toán khi nhận hàng',
};

const Orders = () => {
  const [curPage, setCurPage] = useState(1);
  const isFocused = useIsFocused();
  const { loading, orders } = useGetOrders(isFocused);
  const indexOfLastOrder = curPage * 10;
  const indexOfFirstOrder = indexOfLastOrder - 10;
  const ordersForRender = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / 10);

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
              {ordersForRender.length > 0 ? (
                ordersForRender.map((item, index) => (
                  <OrderItem
                    key={item._id}
                    id={item._id}
                    i={index}
                    price={item.totalAmount}
                    status={statusMaps[item.orderStatus]}
                    paymentMethod={paymentMaps[item.paymentMethod]}
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
            <View>
              <Pagination
                curPage={curPage}
                setCurPage={setCurPage}
                totalPages={totalPages}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Orders;
