import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/styles';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

import {
  backgroundColor,
  borderColor,
  textColors,
} from '../assets/colors/colors';

import NavigationItem from './NavigationItem';

const Footer = ({ activeRoute = 'home' }) => {
  const navigate = useNavigation();
  const { user } = useSelector((state) => state.user);

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigationHandler = (key) => {
    switch (key) {
      case 0:
        navigate.navigate('home');
        break;
      case 1:
        if (!isAuthenticated)
          return Toast.show({
            type: 'error',
            text1: 'Vui lòng đăng nhập',
          });
        navigate.navigate('cart');
        break;
      case 2:
        if (isAuthenticated) navigate.navigate('profile');
        else navigate.navigate('login');
        break;
      default:
        navigate.navigate('home');
        break;
    }
  };

  const avatarOptions = {
    color: colors.color2,
    size: 50,
    style: {
      backgroundColor: colors.color1,
    },
  };

  return (
    loading === false && (
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderTopColor: borderColor.primaryBorder,
          borderTopWidth: 1,
        }}
      >
        <NavigationItem
          iconSrc={require('../assets/icons/home.png')}
          title='TRANG CHỦ'
          onPress={() => navigationHandler(0)}
        />
        <NavigationItem
          iconSrc={require('../assets/icons/heart.png')}
          title='YÊU THÍCH'
          onPress={() => {}}
        />
        <NavigationItem
          iconSrc={require('../assets/icons/bag.png')}
          title='GIỎ HÀNG'
          onPress={() => navigationHandler(1)}
        />
        {/* {!user && ( */}
        <NavigationItem
          iconSrc={require('../assets/icons/profile.png')}
          title={!isAuthenticated ? 'ĐĂNG NHẬP' : 'HỒ SƠ'}
          onPress={() => navigationHandler(2)}
        />
        {/* )} */}
        {/* {user && (
          <NavigationItem
            iconSrc={require('../assets/icons/profile.png')}
            title='PROFILE'
            onPress={() => {
              navigate.navigate('profile');
            }}
          />
        )} */}
      </View>
    )
  );
};

export default Footer;
