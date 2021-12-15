import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import Banner from "../mockImages/banner.png";
import styled from "styled-components/native";
import { CategoriesType, CategoryValueType } from "../shared/types";
import { mockCategories } from "../placeholders/mockCategories";
import { mockCategory } from "../placeholders/mockCategory";

const Container = styled.View`
  flex: 1;
  padding: 5px;
`;

const BannerContainer = styled.ImageBackground`
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 20px;
  width: 100%;
  height: 100px;
`;
const BannerText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;
const SubCategoryContainer = styled.ScrollView`
  height: 80px;
  flex-direction: row;
`;
const ActivityIndicatorContainer = styled.View`
  height: 40px;
  width: 60px;
  justify-content: center;
`;
const CategoryTitleContainer = styled.TouchableOpacity`
  height: 40px;
  background-color: #ddd;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export default function index() {
  const [activeBanner, setActiveBanner] = useState<string>("Personal Care");
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [categoryValues, setCategoryValue] = useState<CategoryValueType[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All Products");

  const setCategoriesData = useCallback(() => {
    setCategories(mockCategories.subCategories);
  }, [setCategories]);
  const setCategoryData = useCallback(() => {
    setCategoryValue(mockCategory);
  }, [setCategories]);

  const fetchData = async () => {
    // await real API call here
    setTimeout(() => setCategoriesData(), 3000);
    setTimeout(() => setCategoryData(), 4000);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <BannerContainer source={Banner}>
        <BannerText>{activeBanner}</BannerText>
      </BannerContainer>
      {categories.length === 0 ? (
        <ActivityIndicatorContainer>
          <ActivityIndicator />
        </ActivityIndicatorContainer>
      ) : (
        <View style={{ height: 70 }}>
          <ScrollView
            horizontal
            style={{ height: 70 }}
            contentContainerStyle={{ height: 70 }}
          >
            <CategoryTitleContainer
              onPress={() => setActiveCategory("All Products")}
              style={{
                backgroundColor:
                  activeCategory === "All Products" ? "#7fa2bc" : "#ddd",
              }}
            >
              <Text
                style={{
                  color: activeCategory === "All Products" ? "#fff" : "#000",
                  fontWeight: "bold",
                }}
              >
                All Products
              </Text>
            </CategoryTitleContainer>
            {categories.map((data, index) => (
              <CategoryTitleContainer
                key={index}
                onPress={() => {
                  setCategoryValue([]);
                  setTimeout(() => setCategoryData(), 1000);
                  setActiveCategory(data.name);
                }}
                style={{
                  backgroundColor:
                    activeCategory === data.name ? "#7fa2bc" : "#ddd",
                }}
              >
                <Text
                  style={{
                    color: activeCategory === data.name ? "#fff" : "#000",
                    fontWeight: "bold",
                  }}
                >
                  {data.name}
                </Text>
              </CategoryTitleContainer>
            ))}
          </ScrollView>
        </View>
      )}
      {categoryValues.length === 0 ? (
        <ActivityIndicatorContainer>
          <ActivityIndicator />
        </ActivityIndicatorContainer>
      ) : (
        <FlatList
          data={categoryValues}
          numColumns={2}
          contentContainerStyle={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
          renderItem={(data) => (
            <View style={{ margin: 5 }}>
              <Image source={data.item.brand.image} />
              <Text
                style={{
                  marginVertical: 10,
                  color: "#888",
                  fontWeight: "bold",
                  width: 150,
                }}
              >
                {data.item.brand.name}
              </Text>
              <Text style={{ color: "#333", fontWeight: "bold", width: 150 }}>
                {data.item.name}
              </Text>
              <Text style={{ color: "#333", fontWeight: "bold", fontSize:18, width: 150 }}>
                {data.item.Price}€
              </Text>
            </View>
          )}
        />
      )}
    </Container>
  );
}
