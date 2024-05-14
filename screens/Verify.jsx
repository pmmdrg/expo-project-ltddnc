import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { resetPassword } from '../redux/actions/otherAction';

import { useMessageAndErrorOther } from '../utils/hooks';

import Footer from '../components/Footer';

import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from '../styles/styles';

const Verify = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const loading = useMessageAndErrorOther(dispatch, navigation, 'login');

  const submitHandler = () => {
    dispatch(resetPassword(otp, password));
  };

  return (
    <>
      <View style={defaultStyle}>
        {/* Heading */}
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Đặt lại mật khẩu</Text>
        </View>
        <View style={styles.container}>
          <TextInput
            {...inputOptions}
            placeholder='OTP'
            secureTextEntry={true}
            keyboardType='number-pad'
            value={otp}
            onChangeText={setOtp}
          />
          <TextInput
            {...inputOptions}
            placeholder='Mật khẩu mới'
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Button
            loading={loading}
            textColor={colors.color2}
            disabled={otp === '' || password === ''}
            style={styles.btn}
            onPress={submitHandler}
          >
            Đặt lại mật khẩu
          </Button>
          <Text style={styles.or}>Hoặc</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('forgetpassword')}
          >
            <Text style={styles.link}>Gửi lại mã OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </>
  );
};

export default Verify;
