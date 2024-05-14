import { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { login } from '../redux/actions/userActions';

import { useMessageAndErrorUser } from '../utils/hooks';

import Footer from '../components/Footer';

import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from '../styles/styles';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const loading = useMessageAndErrorUser(navigation, dispatch, 'profile');

  const submitHandler = () => {
    dispatch(login(email, password));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={defaultStyle}>
        <View style={styles.container}>
          <View style={{ marginBottom: 10 }}>
            <Text style={formHeading}>Login</Text>
          </View>
          <TextInput
            {...inputOptions}
            placeholder='Email'
            autoCapitalize='none'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            {...inputOptions}
            autoCapitalize='none'
            placeholder='Mật khẩu'
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('forgetpassword')}
          >
            <Text style={styles.forget}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <Button
            loading={loading}
            textColor={colors.color2}
            style={styles.btn}
            onPress={submitHandler}
          >
            Đăng nhập
          </Button>
          <Text style={styles.or}>Đăng nhập</Text>
          <Button
            textColor={colors.color2}
            style={styles.btn}
            onPress={() => navigation.navigate('signup')}
          >
            Đăng ký tài khoản
          </Button>
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default Login;
