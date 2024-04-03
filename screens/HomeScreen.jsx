import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';

import {
  backgroundColor,
  borderColor,
  textColors,
} from '../assets/colors/colors';

import HomeSection from '../components/HomeSection';
import NavigationItem from '../components/NavigationItem';

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

const HomeScreen = ({ navigation }) => {
  const [productName, setProductName] = useState('');

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop Tai nghe</Text>
        <Image
          source={require('../../../assets/icons/notification.png')}
          style={styles.notiIcon}
        />
        <Image
          source={require('../../../assets/icons/cart.png')}
          style={styles.cartIcon}
        />
      </View>
      <ScrollView>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder='Tìm kiếm tên sản phẩm'
            value={productName}
            onChangeText={(text) => setProductName(text)}
            style={styles.input}
          />
          <Image source={require('../../../assets/icons/search.png')} />
        </View>
        <HomeSection
          type={sectionType.featured}
          title='Sản phẩm nổi bật'
          list={data}
        />
        <HomeSection
          type={sectionType.bestSeller}
          title='Bán chạy nhất'
          list={data}
        />
        <HomeSection
          type={sectionType.newArrival}
          title='Hàng mới về'
          list={data}
        />
        <HomeSection
          type={sectionType.discount}
          title='Ưu đãi đặc biệt'
          list={data}
        />
      </ScrollView>
      <View style={styles.navigation}>
        <NavigationItem
          iconSrc={require('../../../assets/icons/home.png')}
          title='TRANG CHỦ'
          onPress={() => {}}
        />
        <NavigationItem
          iconSrc={require('../../../assets/icons/heart.png')}
          title='YÊU THÍCH'
          onPress={() => {}}
        />
        <NavigationItem
          iconSrc={require('../../../assets/icons/bag.png')}
          title='ĐƠN HÀNG'
          onPress={() => {}}
        />
        <NavigationItem
          iconSrc={require('../../../assets/icons/profile.png')}
          title='ĐĂNG NHẬP'
          onPress={handleLogin}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor.primaryBackground,
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

export default HomeScreen;
