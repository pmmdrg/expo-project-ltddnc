import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { getProductDetails } from '../../redux/actions/productAction';
import { updateProduct } from '../../redux/actions/otherAction';

import { useMessageAndErrorOther, useSetCategories } from '../../utils/hooks';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import SelectComponent from '../../components/SelectComponent';

import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  inputStyling,
} from '../../styles/styles';

const UpdateProduct = ({ navigation, route }) => {
  const [id] = useState(route.params.id);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [categories, setCategories] = useState([]);
  const isFocused = useIsFocused();
  const { product, loading } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useSetCategories(setCategories, isFocused);

  const loadingOther = useMessageAndErrorOther(
    dispatch,
    navigation,
    'adminpanel'
  );

  const submitHandler = () => {
    dispatch(updateProduct(id, name, description, price, stock, categoryID));
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id, isFocused]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(String(product.price));
      setStock(String(product.stock));
      setCategory(product.category?.category);
      setCategoryID(product.category?._id);
    }
  }, [product]);

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
          <Text style={formHeading}>Cập nhật sản phẩm</Text>
        </View>
        {loading ? (
          <Loader />
        ) : (
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
              <Button
                onPress={() =>
                  navigation.navigate('productimages', {
                    id,
                    images: product.images,
                  })
                }
                textColor={colors.color1}
              >
                Quản lý hình ảnh
              </Button>
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
                placeholder='Hàng trong kho'
                value={stock}
                keyboardType='number-pad'
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
                loading={loadingOther}
                disabled={loadingOther}
              >
                Cập nhật
              </Button>
            </View>
          </ScrollView>
        )}
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

export default UpdateProduct;
