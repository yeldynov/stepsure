import { Link, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSingleRecord } from "../../../lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { getIcon } from "../../../lib/utils";

const SessionDetail = () => {
  const { id } = useGlobalSearchParams();
  const { data: session } = useAppwrite(() => getSingleRecord(id));

  if (!session) {
    return (
      <SafeAreaView className="h-full bg-background">
        <View className="my-6 flex-1 items-center space-y-6 px-4">
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { duration, stars, feedback, date } = session;

  return (
    <SafeAreaView className="h-full bg-background">
      <View className="my-6 flex-1 items-center space-y-6 px-4">
        <Image
          resizeMode="contain"
          className="h-28 w-28"
          source={getIcon(duration)}
        />
        <Text>{feedback}</Text>
        <StarRating stars={stars} />
        <Link
          className="border-softBrand rounded-lg border px-4 py-2"
          href="/sessions"
        >
          Go Back
        </Link>
      </View>
    </SafeAreaView>
  );
};

// Star Component
const Star = ({ filled }) => (
  <Text style={{ color: filled ? "green" : "gray" }}>★</Text>
);

const StarRating = ({ stars }) => {
  const totalStars = 5;
  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: totalStars }, (_, index) => (
        <Star key={index} filled={index < stars} />
      ))}
    </View>
  );
};

export default SessionDetail;
