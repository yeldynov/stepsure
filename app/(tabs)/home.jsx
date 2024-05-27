import { View, Text, Image } from "react-native";
import React from "react";

import { useGlobalContext } from "@/context/GlobalProvider";

import { images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="h-full bg-background">
      <View className="my-6 space-y-6 px-4">
        <View className="mb-6 flex-row items-start justify-between">
          <View>
            <Text className="text-gray-100 font-pmedium text-sm">
              Welcome Back,
            </Text>
            <Text className="font-psemibold text-2xl text-white">
              {user?.username}
            </Text>
          </View>
          <View className="mt-1.5">
            <Image
              className="h-10 w-9"
              resizeMode="contain"
              source={images.logo}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
