import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { otherReducer } from './reducers/otherReducer';
import { productReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    other: otherReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export const server = 'http://192.168.1.2:3000/api/v1';
//export const server = 'http://172.16.30.42:3000/api/v1';
