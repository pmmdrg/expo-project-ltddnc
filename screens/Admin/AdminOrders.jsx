import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle, formHeading } from "../../styles/styles";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import OrderItem from "../../components/OrderItem";
import { useGetOrders, useMessageAndErrorOther } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { Headline } from "react-native-paper";
import { useDispatch } from "react-redux";
import { processOrder } from "../../redux/actions/otherAction";
import NavigationItem from "../../components/NavigationItem";

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
  const { loading, orders } = useGetOrders(isFocused, true);

  const dispatch = useDispatch();

  const [filteredValue, setFilteredValue] = useState('');
  const [isNewestOrder, setIsNewestOrder] = useState(true);

  const sortOrder = orders.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return isNewestOrder ? dateB - dateA : dateA - dateB;
  });

  const finalOrder = sortOrder.filter((order) => {
    if (!filteredValue) return true;

    return order.orderStatus === filteredValue;
  });

  function handleOrderStatus(orderStatus) {
    setFilteredValue(orderStatus);
  }

  function toggleSortOrder() {
    setIsNewestOrder((prevState) => !prevState);
  }

  const handleCreateOrderStatusButton = (...orderStatus) => {
    let elements = [];
    for (let i = 0; i < orderStatus.length; i++) {
      elements.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleOrderStatus(orderStatus[i])}
          style={[
            styles.buttonOrderStatus,
            filteredValue === orderStatus[i]
              ? styles.buttonOrderStatusSelected
              : styles.buttonOrderStatusUnselected,
          ]}
        >
          <Text>{orderStatus[i] ? orderStatus[i] : "All"}</Text>
        </TouchableOpacity>
      );
    }
    return elements;
  };
  const processOrderLoading = useMessageAndErrorOther(
    dispatch,
    navigation,
    "adminpanel"
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
            <View style={styles.btnContainer}>
              <View style={styles.statusContainer}>
                {handleCreateOrderStatusButton(
                  "",
                  "Preparing",
                  "Shipped",
                  "Delivered"
                )}
              </View>
              <View
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <View style={{ marginLeft: "auto" }}>
                  <Text>{isNewestOrder ? "Newest:" : "Latest:"}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    height: 40,
                    aspectRatio: 1,
                    borderWidth: 1,
                    borderColor: "#dadbd7",
                    borderRadius: 10,
                  }}
                >
                  <NavigationItem
                    iconSrc={require("../../assets/icons/swap.png")}
                    onPress={() => toggleSortOrder()}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {finalOrder.length > 0 ? (
              finalOrder.map((item, index) => (
                <OrderItem
                  key={item._id}
                  id={item._id}
                  i={index}
                  price={item.totalAmount}
                  status={statusMaps[item.orderStatus]}
                  paymentMethod={paymentMaps[item.paymentMethod]}
                  orderedOn={item.createdAt.split("T")[0]}
                  address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country} ${item.shippingInfo.pinCode}`}
                  admin={true}
                  updateHandler={updateHandler}
                  loading={processOrderLoading}
                />
              ))
            ) : (
              <Headline style={{ textAlign: "center" }}>
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

const styles = StyleSheet.create({
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 3,
    borderRadius: 10,
    backgroundColor: "#dadbd7",
  },
  buttonOrderStatus: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemStatus: {},
  buttonOrderStatusSelected: {
    backgroundColor: "#f7f7f5",
  },
  buttonOrderStatusUnselected: {},
});

export default AdminOrders;
