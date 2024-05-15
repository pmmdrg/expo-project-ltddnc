import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { updateProfile } from '../redux/actions/otherAction';

import { useMessageAndErrorOther } from '../utils/hooks';

import Header from '../components/Header';

import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from '../styles/styles';

const UpdateProfile = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(user?.address);
  const [city, setCity] = useState(user?.city);
  const [country, setCountry] = useState(user?.country);
  const [pinCode, setPinCode] = useState(user?.pinCode.toString());

  const dispatch = useDispatch();

  const loading = useMessageAndErrorOther(dispatch, navigation, 'profile');

  const submitHandler = () => {
    dispatch(updateProfile(name, email, address, city, country, pinCode));
  };

  return (
    <View style={defaultStyle}>
      <Header back={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          elevation: 10,
          borderRadius: 10,
        }}
      >
        {/* Heading */}
        <View style={{ marginBottom: 10, paddingTop: 70 }}>
          <Text style={formHeading}>Chỉnh sửa hồ sơ</Text>
        </View>
        <View>
          <TextInput
            {...inputOptions}
            placeholder='Tên'
            value={name}
            onChangeText={setName}
            label="Name"
          />
          <TextInput
            {...inputOptions}
            placeholder='Email'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
            label="Email"
          />
          <TextInput
            {...inputOptions}
            placeholder='Địa chỉ'
            value={address}
            onChangeText={setAddress}
            label="Address"
          />
          <TextInput
            {...inputOptions}
            placeholder='Thành phố'
            value={city}
            onChangeText={setCity}
            label="City"
          />
          <TextInput
            {...inputOptions}
            placeholder='Quốc gia'
            value={country}
            onChangeText={setCountry}
            label="Country"
          />
          <TextInput
            {...inputOptions}
            placeholder='Mã bưu chính'
            value={pinCode}
            onChangeText={setPinCode}
            label="Pin Code"
          />
          <Button
            loading={loading}
            textColor={colors.color2}
            style={styles.btn}
            onPress={submitHandler}
          >
            Cập nhật
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;
