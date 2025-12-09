import React from 'react';
import { View, Text } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export default function Home() {
  const user = useAuthStore(state => state.user);

  return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold text-blue-400">
          Hello {user ? user.name : ""}!
        </Text>
      </View>
  );
}
