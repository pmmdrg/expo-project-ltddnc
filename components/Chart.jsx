import { View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import { colors } from '../styles/styles';

import { backgroundColor, textColors } from '../assets/colors/colors';

const screenWidth = Dimensions.get('screen').width - 60 - 75;

const Chart = ({ inStock = 0, outOfStock = 0 }) => {
  const data = [
    {
      name: 'Hết hàng',
      population: outOfStock,
      color: colors.color1_light,
      legendFontColor: textColors.primaryText,
    },
    {
      name: 'Còn hàng',
      population: inStock,
      color: colors.color1_light2,
      legendFontColor: textColors.primaryText,
    },
  ];

  const chartConfig = {
    color: (opacity = 1) => `rgba(26,255,146,${opacity})`,
  };

  return (
    <View>
      <PieChart
        data={data}
        width={screenWidth}
        height={150}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={backgroundColor.transparentBackground}
        absolute
      />
    </View>
  );
};

export default Chart;
