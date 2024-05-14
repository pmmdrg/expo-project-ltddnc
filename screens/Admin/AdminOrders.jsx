import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { colors, defaultStyle, formHeading } from '../../styles/styles';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import OrderItem from '../../components/OrderItem';
import { useGetOrders, useMessageAndErrorOther } from '../../utils/hooks';
import { useIsFocused } from '@react-navigation/native';
import { Headline } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { processOrder } from '../../redux/actions/otherAction';
import Pagination from '../../components/Pagination';

const statusMaps = {
  Shipped: 'Vận chuyển',
  Delivered: 'Đã giao',
  Preparing: 'Đang chuẩn bị',
};

const paymentMaps = {
  ONLINE: 'Trực tuyến',
  COD: 'Thanh toán khi nhận hàng',
};

const AdminOrders = ({ navigation }) => {
  const [curPage, setCurPage] = useState(1);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const { loading, orders } = useGetOrders(isFocused, true);

  const processOrderLoading = useMessageAndErrorOther(
    dispatch,
    navigation,
    'adminpanel'
  );

  const updateHandler = (id) => {
    dispatch(processOrder(id));
  };

  const indexOfLastOrder = curPage * 10;
  const indexOfFirstOrder = indexOfLastOrder - 10;
  const ordersForRender = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / 10);

  return (
    <View
      style={{
        ...defaultStyle,
        backgroundColor: colors.color5,
      }}
    >
      <Header back={true} />

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formHeading}>Tất cả đơn hàng</Text>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            padding: 10,
            flex: 1,
          }}
        >
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
                  admin={true}
                  updateHandler={updateHandler}
                  loading={processOrderLoading}
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
  );
};

export default AdminOrders;
