import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const SessionLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
      </Stack>

      <StatusBar backgroundColor="#FFC96F" style="dark" />
    </>
  );
};

export default SessionLayout;
