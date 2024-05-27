import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";

import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="items-center justify-center px-4">
      <Image
        className="h-[200px] w-[270px]"
        resizeMode="contain"
        source={images.empty}
      />
      <Text className="mt-2 text-center font-psemibold text-xl text-white">
        {title}
      </Text>
      <Text className="text-gray-100 font-pmedium text-sm">{subtitle}</Text>

      <CustomButton
        title="Start Practice"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
