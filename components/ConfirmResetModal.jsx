import React from "react";
import { View, Text, Button, Modal, TouchableOpacity } from "react-native";
import { styled } from "nativewind";

const ConfirmResetModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 items-center justify-center bg-black bg-opacity-50">
        <View className="rounded-lg bg-white p-5">
          <Text className="mb-3 text-xl">Confirm Reset</Text>
          <Text className="mb-3 text-lg">
            Are you sure you want to reset the stopwatch?
          </Text>
          <View className="mt-2 flex-row justify-between">
            <TouchableOpacity
              onPress={onConfirm}
              className={`flex w-2/5 items-center justify-center rounded-lg bg-accentRed px-8 py-3`}
            >
              <Text className="font-pmedium text-lg font-semibold text-white">
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCancel}
              className="ml-3 flex w-2/5 items-center justify-center rounded-lg bg-gray p-4"
            >
              <Text className="font-pmedium text-lg font-semibold text-white">
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmResetModal;
