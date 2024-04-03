import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { textColors } from '../../assets/colors';
import Product from './Product';

const HomeSection = ({ type, title, list }) => {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.sectionMore}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <FlatList
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
      />
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
    paddingHorizontal: 25,
    marginBottom: 30,
  },
});

export default HomeSection;
