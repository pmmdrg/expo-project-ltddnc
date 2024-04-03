import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

import { textColors } from '../assets/colors/colors';
import Product from './Product';
import { useNavigation } from '@react-navigation/native';

const HomeSection = ({ title, list }) => {
  const navigate = useNavigation();

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
        {list.map((item) => (
          // <ProductCard
          //   stock={item.stock}
          //   name={item.name}
          //   price={item.price}
          //   image={item.images[0]?.url}
          //   addToCardHandler={addToCardHandler}
          //   id={item._id}
          //   key={item._id}
          //   i={index}
          //   navigate={navigate}
          // />
          <Product
            key={item.id}
            name={item.name}
            price={item.price}
            rate={item.rate}
            rateCount={item.rateCount}
            navigate={navigate}
          />
        ))}
      </ScrollView>
      {/* <FlatList
        data={list}
        renderItem={({ item }) => {
          return (
            <Product
              name={item.name}
              price={item.price}
              rate={item.rate}
              rateCount={item.rateCount}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.listItem}
      /> */}
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
