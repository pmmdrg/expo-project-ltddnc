import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import { backgroundColor } from '../assets/colors/colors';

const Header = ({ back, emptyCart = false }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigation();

  const dispatch = useDispatch();

  const emptyCartHandler = () => {
    if (!isAuthenticated) {
      return Toast.show({
        type: 'error',
        text1: 'Vui lòng đăng nhập',
      });
    }
    dispatch({
      type: 'clearCart',
    });
  };

  const handleNavigateCart = () => {
    if (!isAuthenticated) {
      return Toast.show({
        type: 'error',
        text1: 'Vui lòng đăng nhập',
      });
    }
    navigate.navigate('cart');
  };

  return (
    <View style={styles.container}>
      {back && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigate.goBack()}
        >
          <Image source={require('../assets/icons/back.png')} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.cartButton}
        onPress={emptyCart ? emptyCartHandler : handleNavigateCart}
      >
        <Image source={require('../assets/icons/cart.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor.primaryBackground,
    height: 70,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex: 100,
    padding: 10,
  },
  cartButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 10,
    padding: 10,
  },
});

export default Header;
