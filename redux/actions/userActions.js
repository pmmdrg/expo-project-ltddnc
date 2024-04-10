import axios from "axios";
import { server } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "registerRequest",
    });

    const { data } = await axios.post(`${server}/user/new`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    // save to storage
    await AsyncStorage.setItem("token", data.token);

    dispatch({
      type: "registerSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "registerFail",
      payload: error.response.data.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    //    Axios here

    const { data } = await axios.post(
      `${server}/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    // save to storage
    await AsyncStorage.setItem("token", data.token);

    dispatch({
      type: "loginSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    // save to storage
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      dispatch({
        type: "loadUserFail",
        payload: "Please login or register new account",
      });
    } else {
      dispatch({
        type: "loadUserRequest",
      });
      const { data } = await axios.get(`${server}/user/me?token=${token}`, {
        withCredentials: true,
      });
      console.log(data);

      dispatch({
        type: "loadUserSuccess",
        payload: data.user,
      });
    }
  } catch (error) {
    dispatch({
      type: "loadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    // save to storage
    const token = await AsyncStorage.getItem("token");

    // remove item
    if (token) await AsyncStorage.removeItem("token");

    dispatch({
      type: "logoutRequest",
    });
    const { data } = await axios.get(`${server}/user/logout?token=${token}`, {
      withCredentials: true,
    });

    dispatch({
      type: "logoutSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};
