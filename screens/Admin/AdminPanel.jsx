import  { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { deleteProduct } from '../../redux/actions/otherAction';
import { getAdminProducts } from '../../redux/actions/productAction';

import { useAdminProducts, useMessageAndErrorOther } from '../../utils/hooks';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import ButtonBox from '../../components/ButtonBox';
import ProductListHeading from '../../components/ProductListHeading';
import ProductListItem from '../../components/ProductListItem';
import { CategoryChart, StockChart } from '../../components/Chart';
import Pagination from '../../components/Pagination';

import { defaultStyle, formHeading } from '../../styles/styles';

import { backgroundColor } from '../../assets/colors/colors';
import ProductListItems from '../../components/ProductListItems';

const AdminPanel = ({ navigation }) => {
  const [curPage, setCurPage] = useState(1);
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

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
        <Text style={formHeading}>Bảng điều khiển admin</Text>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <>
          
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
          <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: backgroundColor.secondaryBackground,
              borderRadius: 20,
              alignItems: 'center',
            }}
          >
            <StockChart inStock={inStock} outOfStock={outOfStock} />
            <CategoryChart />
          </View>
            <View>
              {!loadingDelete &&
                productsForRender.map((item, index) => (
                  <ProductListItems
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
          <View>
            <Pagination
              curPage={curPage}
              setCurPage={setCurPage}
              totalPages={totalPages}
            />
          </View>
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
