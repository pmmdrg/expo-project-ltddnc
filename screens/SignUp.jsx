import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import mime from 'mime';

import { register } from '../redux/actions/userActions';

import { useMessageAndErrorUser } from '../utils/hooks';

import Footer from '../components/Footer';

import {
  colors,
  defaultStyle,
  inputOptions,
  formStyles as styles,
  defaultImg,
} from '../styles/styles';

const SignUp = ({ navigation, route }) => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [pinCode, setPinCode] = useState('');

  const dispatch = useDispatch();

  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('address', address);
    myForm.append('city', city);
    myForm.append('country', country);
    myForm.append('pinCode', pinCode);

    if (avatar !== '') {
      myForm.append('file', {
        uri: avatar,
        type: mime.getType(avatar),
        name: avatar.split('/').pop(),
      });
    }

    dispatch(register(myForm));
  };

  const loading = useMessageAndErrorUser(navigation, dispatch, 'profile');

  useEffect(() => {
    if (route.params?.image) setAvatar(route.params.image);
  }, [route.params]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={defaultStyle}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            elevation: 10,
            borderRadius: 10,
          }}
        >
          <View style={{ minHeight: 900, paddingTop: 20, paddingBottom: 100 }}>
            <Avatar.Image
              style={{
                alignSelf: 'center',
                backgroundColor: colors.color1,
              }}
              size={80}
              source={{
                uri: avatar ? avatar : defaultImg,
              }}
            />
            <TouchableOpacity onPress={() => navigation.navigate('camera')}>
              <Button textColor={colors.color1}>Thay đổi ảnh</Button>
            </TouchableOpacity>
            <TextInput
              {...inputOptions}
              placeholder='Tên'
              value={name}
              onChangeText={setName}
            />
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
              secureTextEntry={true}
              placeholder='Mật khẩu'
              autoCapitalize='none'
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              {...inputOptions}
              placeholder='Địa chỉ'
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              {...inputOptions}
              placeholder='Thành phố'
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              {...inputOptions}
              placeholder='Quốc gia'
              value={country}
              onChangeText={setCountry}
            />
            <TextInput
              {...inputOptions}
              placeholder='Mã bưu chính'
              value={pinCode}
              onChangeText={setPinCode}
            />
            <Button
              loading={loading}
              textColor={colors.color2}
              style={styles.btn}
              onPress={submitHandler}
            >
              Đăng ký
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
        </ScrollView>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default SignUp;
