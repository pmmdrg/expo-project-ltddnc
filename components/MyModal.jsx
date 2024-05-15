import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button } from 'react-native-paper';

import { colors } from '../styles/styles';

const MyModal = ({ id, deleteHandler, navigate, setOpenModal }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
        }}
        onPress={() => setOpenModal(false)}
      >
        <Avatar.Icon
          icon={'close'}
          size={25}
          style={{
            backgroundColor: colors.color1,
          }}
        />
      </TouchableOpacity>
      <Text
        style={styles.text}
        onPress={() => navigate.navigate('updateproduct', { id })}
      >
        Chỉnh sửa
      </Text>
      <Button textColor={colors.color3} onPress={() => deleteHandler(id)}>
        Xóa
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 100,
    backgroundColor: colors.color2,
    padding: 20,
    borderRadius: 10,
  },

  text: {
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default MyModal;
