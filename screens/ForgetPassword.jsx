import { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { forgetPassword } from '../redux/actions/otherAction';

import { useMessageAndErrorOther } from '../utils/hooks';

import Footer from '../components/Footer';

import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from '../styles/styles';

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const loading = useMessageAndErrorOther(dispatch, navigation, 'verify');

  const submitHandler = () => {
    dispatch(forgetPassword(email));
  };

  return (
    <>
      <View style={defaultStyle}>
        <View style={styles.container}>
          <View style={{ marginBottom: 10 }}>
            <Text style={formHeading}>Quên mật khẩu</Text>
          </View>
          <TextInput
            {...inputOptions}
            placeholder='Email'
            autoCapitalize='none'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />
          <Button
            loading={loading}
            textColor={colors.color2}
            style={styles.btn}
            onPress={submitHandler}
          >
            Nhận mã OTP
          </Button>
          <Text style={styles.or}>Hoặc</Text>
          <Button
            loading={loading}
            textColor={colors.color2}
            style={styles.btn}
            onPress={() => navigation.navigate('login')}
          >
            Đăng nhập
          </Button>
        </View>
      </View>
      <Footer />
    </>
  );
};

export default ForgetPassword;
