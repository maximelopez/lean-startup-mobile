import React from 'react';
import { View, Text } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export default function Home() {
  const user = useAuthStore(state => state.user);

  return (
      <View>
        <View>
          <Text className="text-center text-[16px] text-[##4A3983] mx-4 mb-10 mt-24">
            “Ensemble, on transforme les routines en moments de bonheur”
          </Text>
          <Text className="text-[24px] font-bold text-gray-800 mb-4 ml-10">
            Bonjour, {user?.name}
          </Text>
          <Text className="text-[16px] text-gray-900 ml-10 mb-40">
            Ton score bien-être
          </Text>
        </View>

        <View>
          <Text className="text-[24px] font-bold text-gray-800 mb-4 ml-10">
            Mes thématiques
          </Text>
        </View>
      </View>
  );
}
