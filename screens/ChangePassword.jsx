import { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { updatePassword } from '../redux/actions/otherAction';

import { useMessageAndErrorOther } from '../utils/hooks';

import Header from '../components/Header';

import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from '../styles/styles';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();

  const loading = useMessageAndErrorOther(dispatch);

  const submitHandler = () => {
    dispatch(updatePassword(oldPassword, newPassword));
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <View style={defaultStyle}>
      <Header back={true} />
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Thay đổi mật khẩu</Text>
        </View>
        <TextInput
          {...inputOptions}
          placeholder='Mật khẩu cũ'
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TextInput
          {...inputOptions}
          placeholder='Mật khẩu mới'
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Button
          loading={loading}
          textColor={colors.color2}
          style={styles.btn}
          onPress={submitHandler}
        >
          Thay đổi
        </Button>
      </View>
    </View>
  );
};

export default ChangePassword;
