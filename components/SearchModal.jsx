import React, { useEffect } from 'react';
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
  textColors,
} from '../assets/colors/colors';
import { colors } from '../styles/styles';

const SearchModal = ({
  searchQuery,
  setActiveSearch,
  setSearchQuery,
  products = [],
}) => {
  const navigate = useNavigation();

  const backAction = () => {
    setSearchQuery('');
    setActiveSearch(false);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 100,
        backgroundColor: colors.color2,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Image source={require('../assets/icons/back.png')} />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder='Tìm kiếm tên sản phẩm'
              value={searchQuery}
              onChangeText={(query) => setSearchQuery(query)}
              style={styles.input}
            />
            <Image source={require('../assets/icons/search.png')} />
          </View>
        </View>

        <ScrollView>
          <View
            style={{
              paddingVertical: 40,
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
        <Headline
          numberOfLines={1}
          style={{
            fontWeight: '900',
          }}
        >
          ₹{price}
        </Headline>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor.primaryBackground,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
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

export default SearchModal;
