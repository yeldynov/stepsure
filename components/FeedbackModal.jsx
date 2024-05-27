import React, { useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";

const FeedbackModal = ({ visible, onClose, onSubmit, time }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = () => {
    onSubmit(feedback, rating);
    setFeedback("");
    setRating(5);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center bg-dark bg-opacity-50">
        <View className="rounded-lg bg-white p-5">
          <Text className="text-gray-800 mb-3 text-xl font-semibold">
            Feedback
          </Text>
          <Text className="text-gray-700 mb-3 text-lg">Time: {time}</Text>
          <TextInput
            className="mb-3 w-64 rounded-md border p-2"
            placeholder="Leave your feedback here"
            value={feedback}
            onChangeText={setFeedback}
          />
          <Rating
            startingValue={5}
            onFinishRating={setRating}
            style={{ paddingVertical: 20 }}
          />
          <View className=" mt-2 flex-row justify-between">
            <TouchableOpacity
              onPress={handleSubmit}
              className={`flex items-center justify-center rounded-lg bg-freshGreen px-8 py-3`}
            >
              <Text className="font-pmedium text-lg font-semibold text-white">
                Submit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              className="ml-3 rounded-lg bg-gray p-4"
            >
              <Text className="font-pmedium text-lg font-semibold text-white">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FeedbackModal;
