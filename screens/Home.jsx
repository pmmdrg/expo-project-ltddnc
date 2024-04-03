import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { Button } from 'react-native-paper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import SearchModal from '../components/SearchModal';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import HomeSection from '../components/HomeSection';
import NavigationItem from '../components/NavigationItem';

import { getAllProducts } from '../redux/actions/productAction';

import { useSetCategories } from '../utils/hooks';

import {
  backgroundColor,
  borderColor,
  textColors,
} from '../assets/colors/colors';
import { colors } from '../styles/styles';

const data = [
  {
    id: 1,
    name: 'Headphone',
    price: 500000,
    rate: 4.5,
    rateCount: 80,
  },
  {
    id: 2,
    name: 'Headphone',
    price: 500000,
    rate: 4.5,
    rateCount: 80,
  },
  {
    id: 3,
    name: 'Headphone',
    price: 500000,
    rate: 4.5,
    rateCount: 80,
  },
  {
    id: 4,
    name: 'Headphone',
    price: 500000,
    rate: 4.5,
    rateCount: 80,
  },
  {
    id: 5,
    name: 'Headphone',
    price: 500000,
    rate: 4.5,
    rateCount: 80,
  },
];

const Home = () => {
  const [category, setCategory] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);

  const navigate = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { products } = useSelector((state) => state.product);

  const categoryButtonHandler = (id) => {
    setCategory(id);
  };

  const addToCardHandler = (id, name, price, image, stock) => {
    if (stock === 0)
      return Toast.show({
        type: 'error',
        text1: 'Out Of Stock',
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
      text1: 'Added To Cart',
    });
  };

  useSetCategories(setCategories, isFocused);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(getAllProducts(searchQuery, category));
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [dispatch, searchQuery, category, isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}

      {/* <Header /> */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop Tai nghe</Text>
        <Image
          source={require('../assets/icons/notification.png')}
          style={styles.notiIcon}
        />
        <TouchableOpacity
          onPress={() => navigate.navigate('cart')}
          style={styles.cartIcon}
        >
          <Image source={require('../assets/icons/cart.png')} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Search Bar */}
        <TouchableOpacity onPress={() => setActiveSearch(true)}>
          <View style={styles.searchContainer}>
            <Text style={styles.input}>Tìm kiếm tên sản phẩm</Text>
            <Image source={require('../assets/icons/search.png')} />
          </View>
        </TouchableOpacity>

        {/* Categories */}
        <View
          style={{
            flexDirection: 'row',
            height: 80,
          }}
        >
          <ScrollView
            horizontal
            contentContainerStyle={{
              alignItems: 'center',
            }}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((item, index) => (
              <Button
                key={item._id}
                style={{
                  backgroundColor:
                    category === item._id ? colors.color1 : colors.color5,
                  borderRadius: 100,
                  margin: 5,
                }}
                onPress={() => categoryButtonHandler(item._id)}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: category === item._id ? colors.color2 : 'gray',
                  }}
                >
                  {item.category}
                </Text>
              </Button>
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        {/* <View style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item, index) => (
              <ProductCard
                stock={item.stock}
                name={item.name}
                price={item.price}
                image={item.images[0]?.url}
                addToCardHandler={addToCardHandler}
                id={item._id}
                key={item._id}
                i={index}
                navigate={navigate}
              />
            ))}
          </ScrollView>
        </View> */}

        <HomeSection title='Sản phẩm nổi bật' list={data} />
        <HomeSection title='Bán chạy nhất' list={data} />
        <HomeSection title='Hàng mới về' list={data} />
        <HomeSection title='Ưu đãi đặc biệt' list={data} />
      </ScrollView>

      <Footer activeRoute={'home'} />
      <View style={styles.navigation}>
        <NavigationItem
          iconSrc={require('../assets/icons/home.png')}
          title='TRANG CHỦ'
          onPress={() => {
            navigate.navigate('home');
          }}
        />
        <NavigationItem
          iconSrc={require('../assets/icons/heart.png')}
          title='YÊU THÍCH'
          onPress={() => {}}
        />
        <NavigationItem
          iconSrc={require('../assets/icons/bag.png')}
          title='ĐƠN HÀNG'
          onPress={() => {}}
        />
        <NavigationItem
          iconSrc={require('../assets/icons/profile.png')}
          title='ĐĂNG NHẬP'
          onPress={() => {
            navigate.navigate('login');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor.primaryBackground,
    paddingTop: 20,
  },
  searchContainer: {
    backgroundColor: backgroundColor.secondaryBackground,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 30,
    marginHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  header: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: borderColor.primaryBorder,
    borderBottomWidth: 1,
    position: 'relative',
  },
  headerTitle: {
    color: textColors.blueText,
    fontWeight: 'bold',
    fontSize: 18,
  },
  notiIcon: {
    position: 'absolute',
    right: 70,
  },
  cartIcon: {
    position: 'absolute',
    right: 30,
  },
  input: {
    backgroundColor: backgroundColor.transparentBackground,
    fontSize: 14,
    flex: 1,
  },
  navigation: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: borderColor.primaryBorder,
    borderTopWidth: 1,
  },
});

export default Home;
