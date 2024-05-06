import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Pagination = ({ curPage, setCurPage, totalPages }) => {
  const handleIncPage = () => {
    setCurPage(curPage + 1);
  };
  const handleDecPage = () => {
    setCurPage(curPage - 1);
  };
  return (
    <View
      style={{
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        style={styles.incDecBtn}
        onPress={handleDecPage}
        disabled={curPage === 1 ? true : false}
      >
        <Text>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.page}>
        <Text>{curPage}</Text>
      </View>
      <TouchableOpacity
        style={styles.incDecBtn}
        onPress={handleIncPage}
        disabled={curPage === totalPages ? true : false}
      >
        <Text>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    borderWidth: 1,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  incDecBtn: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 100,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});

export default Pagination;
