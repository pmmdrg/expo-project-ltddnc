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
} from 'react-native';
import { Headline } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import {
  backgroundColor,
  borderColor,
  buttonColors,
  textColors,
} from '../assets/colors/colors';
import { colors } from '../styles/styles';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../redux/actions/productAction';

const SearchModal = ({
  searchQuery,
  category,
  setActiveSearch,
  setSearchQuery,
  products = [],
}) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  console.log(searchQuery, category);
  const backAction = () => {
    setSearchQuery('');
    setActiveSearch(false);
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
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
                dispatch(getAllProducts(searchQuery, category));
              }}
            >
              <Image source={require('../assets/icons/white-search.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <View
            style={{
              paddingVertical: 30,
              paddingHorizontal: 10,
            }}
          >
            {products.map((i) => (
              <SearchItem
                key={i._id}
                imgSrc={i.images[0]?.url}
                name={i.name}
                price={i.price}
                handler={() =>
                  navigate.navigate('productdetails', { id: i._id })
                }
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const SearchItem = ({ price, name, imgSrc, handler }) => (
  <TouchableOpacity onPress={handler}>
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.color2,
        elevation: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginVertical: 30,
      }}
    >
      <Image
        source={{
          uri: imgSrc,
        }}
        style={{
          width: 80,
          height: 80,
          position: 'absolute',
          resizeMode: 'contain',
          top: -15,
          left: 10,
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      />

      <View style={{ width: '80%', paddingHorizontal: 30 }}>
        <Text numberOfLines={1}>{name}</Text>
        <Text>{price} VND</Text>
      </View>
    </View>
  </TouchableOpacity>
);

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
