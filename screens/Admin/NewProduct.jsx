import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import mime from 'mime';

import { createProduct } from '../../redux/actions/otherAction';

import { useSetCategories, useMessageAndErrorOther } from '../../utils/hooks';

import Header from '../../components/Header';
import SelectComponent from '../../components/SelectComponent';

import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  inputStyling,
} from '../../styles/styles';

const NewProduct = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Choose Category');
  const [categoryID, setCategoryID] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const isFocused = useIsFocused();
  const disableBtnCondition =
    !name || !description || !price || !stock || !image;

  const dispatch = useDispatch();

  const loading = useMessageAndErrorOther(dispatch, navigation, 'adminpanel');

  useSetCategories(setCategories, isFocused);

  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('description', description);
    myForm.append('price', price);
    myForm.append('stock', stock);
    myForm.append('file', {
      uri: image,
      type: mime.getType(image),
      name: image.split('/').pop(),
    });

    if (categoryID) myForm.append('category', categoryID);

    dispatch(createProduct(myForm));
  };

  useEffect(() => {
    if (route.params?.image) setImage(route.params.image);
  }, [route.params]);

  return (
    <>
      <View
        style={{
          ...defaultStyle,
          backgroundColor: colors.color5,
        }}
      >
        <Header back={true} />
        {/* Heading */}
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={formHeading}>Sản phẩm mới</Text>
        </View>
        <ScrollView
          style={{
            padding: 20,
            elevation: 10,
            borderRadius: 10,
            backgroundColor: colors.color3,
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              height: 650,
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                alignSelf: 'center',
                marginBottom: 20,
              }}
            >
              <Avatar.Image
                size={80}
                style={{
                  backgroundColor: colors.color1,
                }}
                source={{
                  uri: image ? image : null,
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('camera', { newProduct: true })
                }
              >
                <Avatar.Icon
                  icon={'camera'}
                  size={30}
                  color={colors.color3}
                  style={{
                    backgroundColor: colors.color2,
                    position: 'absolute',
                    bottom: 0,
                    right: -5,
                  }}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              {...inputOptions}
              placeholder='Tên'
              value={name}
              onChangeText={setName}
            />
            <TextInput
              {...inputOptions}
              placeholder='Mô tả'
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              {...inputOptions}
              placeholder='Giá'
              keyboardType='number-pad'
              value={price}
              onChangeText={setPrice}
            />
            <TextInput
              {...inputOptions}
              keyboardType='number-pad'
              placeholder='Hàng trong kho'
              value={stock}
              onChangeText={setStock}
            />
            <Text
              style={{
                ...inputStyling,
                textAlign: 'center',
                textAlignVertical: 'center',
                borderRadius: 3,
              }}
              onPress={() => setVisible(true)}
            >
              {category}
            </Text>
            <Button
              textColor={colors.color2}
              style={{
                backgroundColor: colors.color1,
                margin: 20,
                padding: 6,
              }}
              onPress={submitHandler}
              loading={loading}
              disabled={disableBtnCondition || loading}
            >
              Tạo
            </Button>
          </View>
        </ScrollView>
      </View>
      <SelectComponent
        categories={categories}
        setCategoryID={setCategoryID}
        setCategory={setCategory}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default NewProduct;
