import React, { startTransition, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  backgroundColor,
  borderColor,
  buttonColors,
  textColors,
} from '../assets/colors/colors';
import { colors } from '../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByName } from '../redux/actions/productAction';
import ProductCard from './ProductCard';

const SearchModal = ({
  searchQuery,
  setActiveSearch,
  setSearchQuery,
  products = [],
}) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const backAction = () => {
    setSearchQuery('');
    setActiveSearch(false);
  };

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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ alignItems: 'center' }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={backAction} style={styles.backButton}>
            <Image source={require('../assets/icons/back.png')} />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder='Tìm kiếm tên sản phẩm'
              value={searchQuery}
              onChangeText={(query) => setSearchQuery(query)}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={() => {
                dispatch(getProductByName(searchQuery));
              }}
            >
              <Image source={require('../assets/icons/white-search.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: '80%' }}>
          {products.length === 0 ? (
            <Text style={{ color: textColors.secondaryText }}>
              Không có kết quả phù hợp
            </Text>
          ) : (
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
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '120%',
    position: 'absolute',
    top: 0,
    zIndex: 100,
    backgroundColor: colors.color2,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 80,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchContainer: {
    height: 50,
    marginVertical: 30,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: backgroundColor.secondaryBackground,
    fontSize: 14,
    width: '75%',
    borderRadius: 10,
    marginRight: 10,
  },
  searchBtn: {
    backgroundColor: buttonColors.primaryButton,
    padding: 15,
    borderRadius: 10,
  },
});

export default SearchModal;
