import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import FeedbackModal from "./FeedbackModal";
import ConfirmResetModal from "./ConfirmResetModal";

import { useGlobalContext } from "@/context/GlobalProvider";
import { images } from "@/constants";
import { createRecord } from "../lib/appwrite";
import { router } from "expo-router";
import { formatTime } from "../lib/utils";

const Stopwatch = () => {
  const { user } = useGlobalContext();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [confirmResetModalVisible, setConfirmResetModalVisible] =
    useState(false);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      setIntervalId(id);
    } else if (!isRunning && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStartStop = () => {
    if (isRunning) {
      setFeedbackModalVisible(true);
    }
    setIsRunning(!isRunning);
  };

  const handleConfirmReset = () => {
    setConfirmResetModalVisible(true);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setConfirmResetModalVisible(false);
  };

  const handleFeedbackSubmit = async (feedback, rating) => {
    try {
      await createRecord({
        feedback,
        rating,
        duration: time,
        userId: user.$id,
        date: new Date(),
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      handleReset();
      setFeedbackModalVisible(false);
      router.push("/sessions");
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View>
        <Image
          className="mb-10 h-[380px]"
          resizeMode="contain"
          source={images.man}
        />
      </View>
      <Text className="text-gray-900 mb-5 text-6xl font-bold">
        {formatTime(time)}
      </Text>
      <View className=" mt-2 flex-row justify-between">
        <TouchableOpacity
          onPress={handleStartStop}
          className={`flex w-3/4 items-center justify-center rounded-lg px-8 py-3  ${isRunning ? "bg-accentRed" : "bg-freshGreen"}`}
        >
          <Text className="font-pmedium text-lg font-semibold text-white">
            {isRunning ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleConfirmReset}
          disabled={!time}
          className={`ml-3 rounded-lg  p-4 ${!time ? "bg-[#cccccc]" : "bg-gray"}`}
        >
          <Text
            className={`font-pmedium text-lg font-semibold ${!time ? "text-[#808080]" : "text-white"}`}
          >
            Reset
          </Text>
        </TouchableOpacity>
      </View>

      <FeedbackModal
        visible={feedbackModalVisible}
        onClose={() => setFeedbackModalVisible(false)}
        onSubmit={handleFeedbackSubmit}
        time={formatTime(time)}
      />

      <ConfirmResetModal
        visible={confirmResetModalVisible}
        onConfirm={handleReset}
        onCancel={() => setConfirmResetModalVisible(false)}
      />
    </View>
  );
};

export default Stopwatch;
