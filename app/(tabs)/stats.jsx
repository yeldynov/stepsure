import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart } from "react-native-gifted-charts";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserRecords } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import moment from "moment";

const Stats = () => {
  const { user } = useGlobalContext();
  const {
    data: records,
    refetch,
    isLoading,
  } = useAppwrite(() => getUserRecords(user.$id));
  const [refreshing, setRefreshing] = useState(false);
  const [barData, setBarData] = useState([]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // TODO: Work on the correct displaying data, write clean code.

  useEffect(() => {
    if (records) {
      // console.log("Records:", records);

      const last7Days = Array.from({ length: 7 }, (_, index) =>
        moment().subtract(index, "days").format("YYYY-MM-DD"),
      ).reverse();

      // console.log("Last 7 Days:", last7Days);

      const aggregatedData = last7Days.map((date) => {
        const dayRecords = records.filter(
          (record) => moment(record.date).format("YYYY-MM-DD") === date,
        );

        // console.log(`Records for ${date}:`, dayRecords);

        const totalDuration = dayRecords.reduce((sum, record) => {
          const durationInMinutes = record.duration / 60000;
          // Adding a constraint to cap excessively high values
          return sum + Math.min(durationInMinutes, 1440); // Max 24 hours in minutes
        }, 0);

        return {
          label: moment(date).format("ddd"), // 'Mon', 'Tue', etc.
          value: totalDuration,
          frontColor: "#177AD5",
        };
      });

      // console.log("Aggregated Data:", aggregatedData);
      setBarData(aggregatedData);
    }
  }, [records]);

  if (isLoading) {
    return (
      <SafeAreaView className="h-full bg-background">
        <View className="my-6 flex-1 items-center justify-center space-y-6 px-4">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full bg-background">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text className="mt-5 text-center font-psemibold text-lg">
          Last 7 days
        </Text>
        <View className="my-6 flex-1 items-center justify-center space-y-6 px-4">
          {barData.length > 0 ? (
            <BarChart
              barWidth={20}
              noOfSections={4} // Adjusted for better visibility
              barBorderRadius={4}
              frontColor="lightgray"
              data={barData}
              yAxisThickness={1} // Ensure y-axis is visible
              xAxisThickness={1} // Ensure x-axis is visible
              yAxisLabelSuffix="m" // Add a suffix to indicate minutes
            />
          ) : (
            <EmptyState message="No data available" />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stats;
