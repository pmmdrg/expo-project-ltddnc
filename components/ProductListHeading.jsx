import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../styles/styles';
import { backgroundColor, textColors } from '../assets/colors/colors';

const ProductListHeading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ảnh</Text>
      <Text style={styles.text}>Giá</Text>
      <Text style={{ ...styles.text, width: 110 }}>Tên</Text>
      <Text style={{ ...styles.text, width: 80 }}>Danh mục</Text>
      <Text style={{ ...styles.text, width: 70 }}>Trong kho</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor.secondaryBackground,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
  },

  text: {
    width: 60,
    color: textColors.primaryText,
    fontWeight: '900',
  },
});

export default ProductListHeading;
