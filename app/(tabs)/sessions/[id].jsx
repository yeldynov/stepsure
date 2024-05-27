import React, { useState } from "react";
import { Link, router, useGlobalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteRecord, getSingleRecord } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { getIcon } from "@/lib/utils";
import { icons } from "@/constants";

const SessionDetail = () => {
  const { id } = useGlobalSearchParams();
  const { data: session } = useAppwrite(() => getSingleRecord(id));
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleDelete = async () => {
    await deleteRecord(id);
    router.push("/sessions");
  };

  return (
    <SafeAreaView className="h-full bg-background">
      <View className="my-6 flex-1 items-center space-y-6 px-4">
        <TouchableOpacity
          onPress={() => router.push("/sessions")}
          className="flex h-[40px] w-[120px] flex-row items-center justify-center self-start rounded-[20px]  bg-dark"
        >
          <Image
            className="mr-2 h-5 w-5"
            source={icons.leftArrow}
            resizeMode="contain"
          />
          <Text className="font-pmedium text-lg font-semibold text-white">
            Back
          </Text>
        </TouchableOpacity>
        <Image
          resizeMode="contain"
          className="h-56 w-56"
          source={getIcon(duration)}
        />

        <View className="my-4 min-h-[15vh] w-full bg-[#FFBB70] p-4">
          <Text>{feedback}</Text>
        </View>
        <StarRating stars={stars} />
        <View className="flex-row items-center justify-between gap-4 px-4">
          <TouchableOpacity
            onPress={() => {}}
            className="flex w-1/2 items-center justify-center rounded-lg bg-freshGreen px-8 py-3"
          >
            <Text className="font-pmedium text-lg font-semibold text-white">
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="flex w-1/2 items-center justify-center rounded-lg bg-accentRed px-8 py-3"
          >
            <Text className="font-pmedium text-lg font-semibold text-white">
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 items-center justify-center bg-black bg-opacity-50">
          <View className="w-3/4 rounded-lg bg-white p-5">
            <Text className="mb-4 text-lg font-semibold">Confirm Deletion</Text>
            <Text className="mb-6">
              Are you sure you want to delete this session?
            </Text>
            <View className="flex-row justify-end space-x-4">
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                className="bg-gray-300 rounded-md px-4 py-2"
              >
                <Text>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  handleDelete();
                }}
                className="rounded-md bg-red-500 px-4 py-2"
              >
                <Text className="text-white">Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Star Component
const Star = ({ filled }) => (
  <Text className={`${filled ? "text-sereneTeal" : "text-calmGray"} text-5xl`}>
    ★
  </Text>
);

const StarRating = ({ stars }) => {
  const totalStars = 5;
  return (
    <View className="my-2 flex-row">
      {Array.from({ length: totalStars }, (_, index) => (
        <Star key={index} filled={index < stars} />
      ))}
    </View>
  );
};

export default SessionDetail;
