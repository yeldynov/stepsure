import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { icons } from "@/constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  hasError,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="font-pmedium text-base text-gray">{title}</Text>
      <View
        className={`h-16 w-full flex-row items-center rounded-2xl  border-2 border-[#FFBB70] bg-[#FFEC9E] px-4 focus:border-sereneTeal  ${hasError ? "border-red-500" : ""} `}
      >
        <TextInput
          className="flex-1 font-psemibold text-base text-dark"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#ED9455"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
