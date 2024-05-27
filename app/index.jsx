import { Redirect, router } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "../components/CustomButton";
import { images } from "../constants";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Index() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="h-full bg-background">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="min-h-[95vh] w-full items-center justify-center px-4">
          <Image
            className="h-[55px] w-[246px]"
            source={images.logo_top}
            resizeMode="contain"
          />
          <Image
            source={images.cat}
            className="h-[300px] w-full max-w-[380px]"
            resizeMode="contain"
          />
          <View className="relative mt-4">
            <Text className="pt-1 text-center font-bhavuka text-[46px] leading-[40px] text-dark">
              Discover Inner Strength & Stillness
            </Text>
          </View>
          <Text className="mt-7 text-center font-pregular text-sm text-dark">
            When practice becomes a habit, true growth begins to show. Stepsure
            will help you in creating such a habit.
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#FFC96F" style="dark" />
    </SafeAreaView>
  );
}
