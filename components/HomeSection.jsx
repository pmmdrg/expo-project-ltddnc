import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

import { textColors } from '../assets/colors/colors';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ProductCard from './ProductCard';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const HomeSection = ({ title, list }) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const addToCardHandler = (id, name, price, image, stock) => {
    if (stock === 0)
      return Toast.show({
        type: 'error',
        text1: 'Out Of Stock',
      });
    dispatch({
      type: 'addToCart',
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: 1,
      },
    });
    Toast.show({
      type: 'success',
      text1: 'Added To Cart',
    });
  };

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.sectionMore}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.listItem}
      >
        {list.map((item, index) => (
          <ProductCard
            stock={item.stock}
            name={item.name}
            price={item.price}
            image={item.images[0]?.url}
            addToCardHandler={addToCardHandler}
            id={item._id}
            key={item._id}
            i={index}
            navigate={navigate}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: textColors.primaryText,
  },
  sectionMore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: textColors.blueText,
  },
  listItem: {
    paddingHorizontal: 15,
    marginBottom: 30,
  },
});

export default HomeSection;
