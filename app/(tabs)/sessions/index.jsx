import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "@/components/EmptyState";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserRecords } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import RecordCard from "@/components/RecordCard";

const Sessions = () => {
  const { user } = useGlobalContext();
  const { data: records, refetch } = useAppwrite(() =>
    getUserRecords(user.$id),
  );
  const [refreshing, setRefreshing] = useState(false);

  // TODO: Page should refresh when new record is added.

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full bg-background">
      <View className="my-6 flex-1 items-center space-y-6 px-4">
        <FlatList
          data={records}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <RecordCard item={item} />}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Records Found"
              subtitle="Maybe it's time for the practice?"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Sessions;
