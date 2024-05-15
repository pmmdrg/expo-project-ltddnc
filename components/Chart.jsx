import { View, Dimensions, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";

import { colors } from "../styles/styles";

import { backgroundColor, textColors } from "../assets/colors/colors";
import { useEffect, useState } from "react";
import { server } from "../redux/store";
import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("screen").width - 60 - 75;

export const StockChart = ({ inStock = 0, outOfStock = 0 }) => {
  const data = [
    {
      name: "Hết hàng",
      population: outOfStock,
      color: "#b00c0c",
      legendFontColor: textColors.primaryText,
    },
    {
      name: "Còn hàng",
      population: inStock,
      color: "#5aab49",
      legendFontColor: textColors.primaryText,
    },
  ];

  const chartConfig = {
    color: (opacity = 1) => `rgba(26,255,146,${opacity})`,
  };

  return (
    <>
      <View>
        <PieChart
          data={data}
          width={screenWidth}
          height={150}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={backgroundColor.transparentBackground}
          absolute
        />
      </View>
      <View>
        <Text>Biểu đồ </Text>
      </View>
    </>
  );
};

export const CategoryChart = ({ inStock = 0, outOfStock = 0 }) => {
  const products = useSelector((state) => {
    return state.product.products;
  });
  const obj = {};
  const total = products.length;
  products.forEach((p) => {
    const { category } = p.category;
    if (typeof obj[category] === "number") {
      obj[category] = obj[category] + 1;
    } else {
      obj[category] = 1;
    }
  });

  console.log(obj, total);

  const data = Object.entries(obj).map((value, key) => {
    const [name, quantity] = value;
    return {
      name,
      population: quantity,
      color: (() => {
        const r = Math.ceil(Math.random() * 255);
        const g = Math.ceil(Math.random() * 255);
        const b = Math.ceil(Math.random() * 255);
        return `rgba(${r},${g},${b}, 1)`;
      })(),
      legendFontColor: textColors.primaryText,
    };
  });

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
        accessor={"population"}
        backgroundColor={backgroundColor.transparentBackground}
        absolute
      />
    </View>
  );
};
