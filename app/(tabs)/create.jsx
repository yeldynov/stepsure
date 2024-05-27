import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Stopwatch from "../../components/Stopwatch";

const Create = () => {
  return (
    <SafeAreaView className="h-full bg-background">
      <View className="my-6 flex-1 items-center justify-center space-y-6 px-4">
        <Stopwatch />
      </View>
    </SafeAreaView>
  );
};

export default Create;
