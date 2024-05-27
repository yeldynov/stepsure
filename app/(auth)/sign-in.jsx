import { View, Text, ScrollView, Image, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (form.email.trim().length === 0) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (form.password.trim().length === 0) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submit = async () => {
    if (validate()) {
      setIsSubmitting(true);
      try {
        await signIn(form.email, form.password);
        const result = await getCurrentUser();

        setUser(result);
        setIsLoggedIn(true);

        router.replace("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <SafeAreaView className="h-full bg-background">
      <ScrollView>
        <View className="my-6 min-h-[85vh] w-full justify-center px-4">
          <Image
            source={images.logo_top}
            resizeMode="contain"
            className="h-[55px] w-[246px]"
          />
          <Text className="pt-6 font-psemibold text-2xl font-semibold text-dark">
            Log in
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => handleChange("email", e)}
            otherStyles="mt-7"
            keyboardType="email-address"
            hasError={!!errors.email}
          />
          {errors.email ? (
            <Text className="text-red-500">{errors.email}</Text>
          ) : null}
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => handleChange("password", e)}
            otherStyles="mt-7"
            hasError={!!errors.password}
          />
          {errors.password ? (
            <Text className="text-red-500">{errors.password}</Text>
          ) : null}

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="font-pregular text-lg text-dark">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="font-psemibold text-lg text-brand">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
