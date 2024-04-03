import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const NavigationItem = ({ iconSrc, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={iconSrc} />
      <Text style={styles.itemTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: { fontSize: 12, fontWeight: 'bold', marginTop: 2 },
});

export default NavigationItem;
