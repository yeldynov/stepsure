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
import { deleteRecord, getSingleRecord } from "../../../lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { getIcon } from "../../../lib/utils";

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
        <Image
          resizeMode="contain"
          className="h-28 w-28"
          source={getIcon(duration)}
        />
        <Text>{feedback}</Text>
        <StarRating stars={stars} />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="flex w-full items-center justify-center rounded-lg bg-accentRed px-8 py-3"
        >
          <Text className="font-pmedium text-lg font-semibold text-white">
            Delete Session
          </Text>
        </TouchableOpacity>
        <Link
          className="rounded-lg border border-softBrand px-4 py-2"
          href="/sessions"
        >
          Go Back
        </Link>
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
