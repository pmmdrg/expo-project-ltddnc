import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { colors, defaultStyle, formHeading } from '../../styles/styles';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import ButtonBox from '../../components/ButtonBox';
import ProductListHeading from '../../components/ProductListHeading';
import ProductListItem from '../../components/ProductListItem';
import Chart from '../../components/Chart';
import { useAdminProducts, useMessageAndErrorOther } from '../../utils/hooks';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { deleteProduct } from '../../redux/actions/otherAction';
import { getAdminProducts } from '../../redux/actions/productAction';
import { backgroundColor } from '../../assets/colors/colors';
import Pagination from '../../components/Pagination';

const AdminPanel = ({ navigation }) => {
  const [curPage, setCurPage] = useState(1);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { loading, products, inStock, outOfStock } = useAdminProducts(
    dispatch,
    isFocused
  );

  const navigationHandler = (text) => {
    switch (text) {
      case 'Category':
        navigation.navigate('categories');
        break;
      case 'All Orders':
        navigation.navigate('adminorders');
        break;
      case 'Product':
        navigation.navigate('newproduct');
        break;

      default:
        navigation.navigate('adminorders');
        break;
    }
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const loadingDelete = useMessageAndErrorOther(
    dispatch,
    null,
    null,
    getAdminProducts
  );

  const indexOfLastProduct = curPage * 10;
  const indexOfFirstProduct = indexOfLastProduct - 10;
  const productsForRender = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / 10);

  return (
    <View style={[defaultStyle, styles.container]}>
      <Header back={true} />
      {/* Heading */}
      <View style={{ paddingTop: 70, marginBottom: 20 }}>
        <Text style={formHeading}>Admin Panel</Text>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <>
          <View
            style={{
              backgroundColor: backgroundColor.secondaryBackground,
              borderRadius: 20,
              alignItems: 'center',
            }}
          >
            <Chart inStock={inStock} outOfStock={outOfStock} />
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                justifyContent: 'space-between',
              }}
            >
              <ButtonBox
                icon={'plus'}
                displayText={'Sản phẩm'}
                handlerText={'Product'}
                handler={navigationHandler}
              />

              <ButtonBox
                icon={'format-list-bulleted-square'}
                displayText={'Đơn hàng'}
                handlerText={'All Orders'}
                handler={navigationHandler}
                reverse={true}
              />
              <ButtonBox
                icon={'plus'}
                displayText={'Danh mục'}
                handlerText={'Category'}
                handler={navigationHandler}
              />
            </View>
          </View>

          <ProductListHeading />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {!loadingDelete &&
                productsForRender.map((item, index) => (
                  <ProductListItem
                    navigate={navigation}
                    deleteHandler={deleteProductHandler}
                    key={item?._id}
                    id={item?._id}
                    i={index}
                    price={item?.price}
                    stock={item?.stock}
                    name={item?.name}
                    category={item?.category?.category}
                    imgSrc={item?.images[0]?.url}
                  />
                ))}
            </View>
          </ScrollView>
          <Pagination
            curPage={curPage}
            setCurPage={setCurPage}
            totalPages={totalPages}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});

export default AdminPanel;
