import React from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const AllProducts = () => {
  const navigate = useNavigation();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);
  const addToCartHandler = (id, name, price, image, stock) => {
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
        product: id,
        name,
        price,
        image,
        stock,
        quantity: 1,
      },
    });
    Toast.show({
      type: 'success',
      text1: 'Đã thêm vào giỏ hàng',
    });
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <Header back={true} />
      <View
        style={{ alignItems: 'center', paddingTop: 20, paddingBottom: 150 }}
      >
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => {
            return item?._id;
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style={{ marginBottom: 20 }}>
                <ProductCard
                  stock={item?.stock}
                  name={item?.name}
                  price={item?.price}
                  image={item?.images[0]?.url}
                  addToCartHandler={addToCartHandler}
                  id={item?._id}
                  navigate={navigate}
                />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllProducts;
