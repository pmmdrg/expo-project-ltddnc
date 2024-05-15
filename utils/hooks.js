import { useEffect, useState } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { server } from '../redux/store';
import { loadUser } from '../redux/actions/userActions';
import { getAdminProducts } from '../redux/actions/productAction';

export const useMessageAndErrorUser = (
  navigation,
  dispatch,
  navigateTo = 'login'
) => {
  const { loading, message, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });

      dispatch({
        type: 'clearError',
      });
    }

    if (message) {
      navigation.reset({
        index: 0,
        routes: [{ name: navigateTo }],
      });

      Toast.show({
        type: 'success',
        text1: message,
      });

      dispatch({
        type: 'clearMessage',
      });
      dispatch(loadUser());
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useMessageAndErrorOther = (
  dispatch,
  navigation,
  navigateTo,
  func
) => {
  const { loading, message, error } = useSelector((state) => state.other);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });

      dispatch({
        type: 'clearError',
      });
    }

    if (message) {
      Toast.show({
        type: 'success',
        text1: message,
      });

      dispatch({
        type: 'clearMessage',
      });

      navigateTo && navigation.navigate(navigateTo);

      func && dispatch(func());
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useSetCategories = (setCategories, isFocused) => {
  useEffect(() => {
    axios
      .get(`${server}/product/categories`)
      .then((res) => {
        res.data.categories.unshift({ category: 'All' });
        setCategories(res.data.categories);
      })
      .catch((e) => {
        Toast.show({
          type: 'error',
          text1: e.response.data.message,
        });
      });
  }, [isFocused]);
};

export const useGetOrders = (isFocused, isAdmin = false) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      // get from storage
      const token = await AsyncStorage.getItem('token');

      setLoading(true);

      axios
        .get(`${server}/order/${isAdmin ? 'admin' : 'my'}?token=${token}`)
        .then((res) => {
          setOrders(res.data.orders);
          setLoading(false);
        })
        .catch((e) => {
          Toast.show({
            type: 'error',
            text1: e.response.data.message,
          });

          setLoading(false);
        });
    };

    init();
  }, [isFocused]);

  return {
    loading,
    orders,
  };
};

export const useAdminProducts = (dispatch, isFocused) => {
  const { products, inStock, outOfStock, error, loading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });
      dispatch({
        type: 'clearError',
      });
    }

    dispatch(getAdminProducts());
  }, [dispatch, isFocused, error]);

  return {
    products,
    inStock,
    outOfStock,
    loading,
  };
};
