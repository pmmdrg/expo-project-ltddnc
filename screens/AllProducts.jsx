import React, { useState } from 'react';
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
import Toast from 'react-native-toast-message';
import Pagination from '../components/Pagination';
import { defaultStyle } from '../styles/styles';

const AllProducts = () => {
  const [curPage, setCurPage] = useState(1);
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

  const indexOfLastProduct = curPage * 10;
  const indexOfFirstProduct = indexOfLastProduct - 10;
  const productsForRender = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / 10);

  return (
    <View style={defaultStyle}>
      <Header back={true} />
      <View style={{ alignItems: 'center', flex: 1 }}>
        <FlatList
          data={productsForRender}
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
                  avgScore={item?.avgScore}
                  navigate={navigate}
                />
              </View>
            );
          }}
        />
      </View>
      <View>
        <Pagination
          curPage={curPage}
          setCurPage={setCurPage}
          totalPages={totalPages}
        />
      </View>
    </View>
  );
};

export default AllProducts;
