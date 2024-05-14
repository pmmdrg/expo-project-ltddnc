import  { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import {
  getAllProducts,
  getProductByCategory,
  getProductByName,
} from '../redux/actions/productAction';

import { useSetCategories } from '../utils/hooks';

import SearchModal from '../components/SearchModal';
import Footer from '../components/Footer';
import HomeSection from '../components/HomeSection';


import {
  backgroundColor,
  borderColor,
  buttonColors,
  textColors,
} from '../assets/colors/colors';

import { colors } from '../styles/styles';

const Home = () => {
  const [category, setCategory] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const isFocused = useIsFocused();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);
  const displayProduct = products.slice(0, 10);
  
  const navigate = useNavigation();

  const dispatch = useDispatch();
  
  useSetCategories(setCategories, isFocused);



  const categoryButtonHandler = (category) => {
    setCategory(category);
  };

  const handleSearch = () => {
    if (searchQuery === '') {
      return Toast.show({
        type: 'error',
        text1: 'Nội dung tìm kiếm không được trống',
      });
    } else {
      dispatch(getProductByName(searchQuery));
      setActiveSearch(true);
    }
  };


  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (category === '' && activeSearch === false) {
        dispatch(getAllProducts());
      } else if (category !== '' && activeSearch === false) {
        dispatch(getProductByCategory(category));
      }
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [dispatch, category, isFocused, activeSearch]);

  return (
    <SafeAreaView style={styles.container}>
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          category={category}
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
          onPress={
            isAuthenticated
              ? () => navigate.navigate('cart')
              : () =>
                  Toast.show({
                    type: 'error',
                    text1: 'Vui lòng đăng nhập',
                  })
          }
          style={styles.cartIcon}
        >
          <Image source={require('../assets/icons/cart.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder='Tìm kiếm tên sản phẩm'
            value={searchQuery}
            onChangeText={(query) => setSearchQuery(query)}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchBtn}>
            <Image source={require('../assets/icons/white-search.png')} />
          </TouchableOpacity>
        </View>
        {/* Categories */}
        <View
          style={{
            flexDirection: 'row',
            height: 80,
            paddingHorizontal: 20,
          }}
        >
          <ScrollView
            horizontal
            contentContainerStyle={{
              alignItems: 'center',
            }}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((item) => {
              return (
                <Button
                  key={item._id}
                  style={{
                    backgroundColor:
                      category === item.category
                        ? colors.color1
                        : colors.color5,
                    borderRadius: 100,
                    margin: 5,
                  }}
                  onPress={() => categoryButtonHandler(item.category)}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color:
                        category === item.category ? colors.color2 : 'gray',
                    }}
                  >
                    {item.category}
                  </Text>
                </Button>
              );
            })}
          </ScrollView>
        </View>
        {/* Products */}
        <HomeSection title='Sản phẩm nổi bật' list={displayProduct} />
        <HomeSection title='Bán chạy nhất' list={displayProduct} />
        <HomeSection title='Hàng mới về' list={displayProduct} />
        <HomeSection title='Ưu đãi đặc biệt' list={displayProduct} />
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: backgroundColor.primaryBackground,
    paddingTop: 20,
  },
  searchContainer: {
    height: 50,
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
    backgroundColor: backgroundColor.secondaryBackground,
    height: 50,
    fontSize: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
    flex: 1,
  },
  searchBtn: {
    backgroundColor: buttonColors.primaryButton,
    padding: 15,
    borderRadius: 10,
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
