import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { formatPrice } from '../utils/format';

import MyModal from '../components/MyModal';

import { colors } from '../styles/styles';

const ProductListItems = ({
  navigate,
  deleteHandler,
  i,
  id,
  price,
  stock,
  name,
  category,
  imgSrc,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={() => setOpenModal((prev) => !prev)}
        onPress={() => navigate.navigate('productdetails', { id })}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor: i % 2 === 0 ? colors.color2 : colors.color3,
          }}
        >
          <Text
            style={{
              ...styles.text,
              backgroundColor: i % 2 === 0 ? colors.color3 : colors.color1,
            }}
          >
            ID - #{id}
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View>
              <TextBox title={'Tên'} value={name} i={i} />
              <TextBox title={'Giá'} value={formatPrice(price)} i={i} />
              <TextBox title={'Danh mục'} value={category} i={i} />
              <TextBox title={'Trong kho'} value={stock} i={i} />
            </View>
            <View style={{ marginLeft: 'auto' }}>
              <Image
                source={{
                  uri: imgSrc,
                }}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {openModal && (
        <MyModal
          id={id}
          deleteHandler={deleteHandler}
          navigate={navigate}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

const TextBox = ({ title, value, i }) => (
  <Text
    style={{
      marginVertical: 6,
      color: i % 2 === 0 ? colors.color3 : colors.color2,
    }}
  >
    <Text style={{ fontWeight: '900' }}>{title} - </Text>
    {value}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  text: {
    color: colors.color2,
    fontSize: 16,
    fontWeight: '900',
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default ProductListItems;
