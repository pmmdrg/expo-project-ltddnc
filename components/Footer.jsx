import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import NavigationItem from './NavigationItem';

import { borderColor } from '../assets/colors/colors';

const Footer = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigation();

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
      </View>
    )
  );
};

export default Footer;
