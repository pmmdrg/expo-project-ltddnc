import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { backgroundColor, textColors } from '../../assets/colors';

const Product = ({ name, price, rate, rateCount }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/headphone.png')}
          style={styles.prodImage}
        />
        <View style={styles.prodInfo}>
          <Text style={styles.prodName}>{name}</Text>
          <Text style={styles.prodPrice}>{price} VND</Text>
          <View style={styles.rateContainer}>
            <Image source={require('../../assets/icons/star.png')} />
            <Text style={styles.prodRate}>{rate}</Text>
          </View>
          <View style={styles.prodFooter}>
            <Text style={styles.prodRateCount}>{rateCount} lượt đánh giá</Text>
            <TouchableOpacity>
              <Image source={require('../../assets/icons/option.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    alignItems: 'center',
    backgroundColor: backgroundColor.secondaryBackground,
    borderRadius: 10,
    paddingVertical: 15,
  },
  prodInfo: { width: 130, marginTop: 20 },
  prodImage: {
    width: 130,
    height: 130,
  },
  prodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: textColors.primaryText,
    marginBottom: 4,
  },
  prodPrice: { fontSize: 14, fontWeight: 'bold', color: textColors.redText },
  prodFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  rateContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  prodRate: { fontSize: 12, color: textColors.primaryText, marginLeft: 4 },
  prodRateCount: { fontSize: 12, color: textColors.primaryText },
});

export default Product;
