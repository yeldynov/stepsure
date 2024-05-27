import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "@/lib/appwrite";

import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="h-full bg-background">
      <View className="mb-12 mt-6 w-full items-center justify-center px-4">
        <TouchableOpacity onPress={logout} className="mb-10 w-full items-end">
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="h-6 w-6"
          />
        </TouchableOpacity>

        <View className="border-secondary h-16 w-16 items-center justify-center rounded-lg border">
          <Image
            source={{ uri: user?.avatar }}
            className="h-[90%] w-[90%] rounded-lg"
            resizeMode="cover"
          />
        </View>

        <InfoBox
          title={user?.username}
          containerStyles="mt-5"
          titleStyles="text-lg"
        />

        <View className="mt-5 flex-row">
          <InfoBox
            title={0}
            subtitle="Posts"
            containerStyles="mr-10"
            titleStyles="text-xl"
          />
          <InfoBox title="1.2k" subtitle="Followers" titleStyles="text-xl" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
