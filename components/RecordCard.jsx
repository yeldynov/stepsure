import { View, Text, TouchableOpacity, Image } from "react-native";
import { formatTime, getIcon } from "../lib/utils";
import { router } from "expo-router";

const RecordCard = ({ item }) => {
  const { duration, stars, feedback, date, $id } = item;

  const truncateFeedback = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handlePress = () => {
    router.push(`/sessions/${$id}`);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="border-softBrand mb-2 flex w-full flex-row items-center justify-between rounded-lg border-2 p-4"
    >
      <Image
        className="h-16 w-16 "
        resizeMode="contain"
        source={getIcon(duration)}
      />
      <View className="ml-10 w-full">
        <Text className="text-left font-psemibold text-xl">
          {truncateFeedback(feedback, 17)}
        </Text>
        <Text>{formatTime(duration)}</Text>
        <Text>{new Date(date).toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecordCard;
