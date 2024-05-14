import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { server } from '../store';

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    // get from storage
    const token = await AsyncStorage.getItem('token');

    try {
      dispatch({
        type: 'updatePasswordRequest',
      });

      const { data } = await axios.put(
        `${server}/user/changepassword?token=${token}`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: 'updatePasswordSuccess',
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: 'updatePasswordFail',
        payload: error.response.data.message,
      });
    }
  };

export const updateProfile =
  (name, email, address, city, country, pinCode) => async (dispatch) => {
    // get from storage
    const token = await AsyncStorage.getItem('token');

    try {
      dispatch({
        type: 'updateProfileRequest',
      });

      const { data } = await axios.put(
        `${server}/user/updateprofile?token=${token}`,
        {
          name,
          email,
          address,
          city,
          country,
          pinCode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: 'updateProfileSuccess',
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: 'updateProfileFail',
        payload: error.response.data.message,
      });
    }
  };

export const updatePic = (formData) => async (dispatch) => {
  try {
    // get from storage
    const token = await AsyncStorage.getItem('token');

    dispatch({
      type: 'updatePicRequest',
    });

    const { data } = await axios.put(
      `${server}/user/updatepic?token=${token}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: 'updatePicSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'updatePicFail',
      payload: error.response.data.message,
    });
  }
};

export const placeOrder =
  (
    orderItems,
    shippingInfo,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    paymentInfo
  ) =>
  async (dispatch) => {
    // get from storage
    const token = await AsyncStorage.getItem('token');

    try {
      dispatch({
        type: 'placeOrderRequest',
      });

      const { data } = await axios.post(
        `${server}/order/new?token=${token}`,
        {
          shippingInfo,
          orderItems,
          paymentMethod,
          paymentInfo,
          itemsPrice,
          taxPrice,
          shippingCharges,
          totalAmount,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: 'placeOrderSuccess',
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: 'placeOrderFail',
        payload: error.response.data.message,
      });
    }
  };

export const processOrder = (id) => async (dispatch) => {
  // get from storage
  const token = await AsyncStorage.getItem('token');

  try {
    dispatch({
      type: 'processOrderRequest',
    });

    const { data } = await axios.put(
      `${server}/order/single/${id}?token=${token}`,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: 'processOrderSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'processOrderFail',
      payload: error.response.data.message,
    });
  }
};

export const addCategory = (category) => async (dispatch) => {
  // get from storage
  const token = await AsyncStorage.getItem('token');

  try {
    dispatch({
      type: 'addCategoryRequest',
    });

    const { data } = await axios.post(
      `${server}/product/category?token=${token}`,
      {
        category,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: 'addCategorySuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'addCategoryFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  // get from storage
  const token = await AsyncStorage.getItem('token');

  try {
    dispatch({
      type: 'deleteCategoryRequest',
    });

    const { data } = await axios.delete(
      `${server}/product/category/${id}?token=${token}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: 'deleteCategorySuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'deleteCategoryFail',
      payload: error.response.data.message,
    });
  }
};

export const createProduct = (formData) => async (dispatch) => {
  // get from storage
  const token = await AsyncStorage.getItem('token');

  try {
    dispatch({
      type: 'addProductRequest',
    });

    const { data } = await axios.post(
      `${server}/product/new?token=${token}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: 'addProductSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'addProductFail',
      payload: error.response.data.message,
    });
  }
};

export const updateProduct =
  (id, name, description, price, stock, category) => async (dispatch) => {
    // get from storage
    const token = await AsyncStorage.getItem('token');

    try {
      dispatch({
        type: 'updateProductRequest',
      });

      const { data } = await axios.put(
        `${server}/product/single/${id}?token=${token}`,
        {
          name,
          description,
          price,
          stock,
          category,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: 'updateProductSuccess',
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: 'updateProductFail',
        payload: error.response.data.message,
      });
    }
  };

export const updateProductImage = (productId, formData) => async (dispatch) => {
  // get from storage
  const token = await AsyncStorage.getItem('token');

  try {
    dispatch({
      type: 'updateProductImageRequest',
    });

    const { data } = await axios.post(
      `${server}/product/images/${productId}?token=${token}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: 'updateProductImageSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'updateProductImageFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteProductImage = (productId, imageId) => async (dispatch) => {
  // get from storage
  const token = await AsyncStorage.getItem('token');

  try {
    dispatch({
      type: 'deleteProductImageRequest',
    });

    const { data } = await axios.delete(
      `${server}/product/images/${productId}?id=${imageId}&token=${token}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: 'deleteProductImageSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'deleteProductImageFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  // get from storage
  const token = await AsyncStorage.getItem('token');

  try {
    dispatch({
      type: 'deleteProductRequest',
    });

    const { data } = await axios.delete(
      `${server}/product/single/${productId}?token=${token}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: 'deleteProductSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'deleteProductFail',
      payload: error.response.data.message,
    });
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: 'forgetPasswordRequest',
    });

    const { data } = await axios.post(
      `${server}/user/forgetpassword`,
      {
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: 'forgetPasswordSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'forgetPasswordFail',
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (otp, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'resetPasswordRequest',
    });

    const { data } = await axios.put(
      `${server}/user/forgetpassword`,
      {
        otp,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: 'resetPasswordSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'resetPasswordFail',
      payload: error.response.data.message,
    });
  }
};

export const postComment = (productId, comment, vote) => async (dispatch) => {
  // get from storage
  const token = await AsyncStorage.getItem('token');

  try {
    dispatch({ type: 'postCommentRequest' });

    const { data } = await axios.get(
      `${server}/user/havebought?productId=${productId}&token=${token}`
    );

    if (data.success) {
      const { data } = await axios.post(
        `${server}/product/comment?productId=${productId}&token=${token}`,
        { comment, vote },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      dispatch({ type: 'postCommentSuccess', payload: data.message });

      Toast.show({
        type: 'success',
        text1: 'Đã đăng bình luận',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Bạn chưa mua sản phẩm này',
      });
    }
  } catch (error) {
    dispatch({ type: 'postCommentFail', payload: error.response.data.message });
  }
};
