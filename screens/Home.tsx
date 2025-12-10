import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import DonutProgress from '../components/DonutProgress';
import ChallengeCard from "../components/ChallengeCard";

export default function Home() {
  const user = useAuthStore(state => state.user);

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 60 }}
    >

      {/* Header */}
      <View className="mt-20 px-6">
        <Text className="text-center text-[16px] text-[#4A3983] mb-10">
          “Ensemble, on transforme les routines en moments de bonheur”
        </Text>

        <Text className="text-[28px] font-bold text-gray-900 mb-2">
          Bonjour, {user?.name}
        </Text>

        <Text className="text-[16px] text-gray-700 mb-10">
          Ton score bien-être
        </Text>
      </View>

      {/* Donut */}
      <DonutProgress score={78} progress={0.35} />

      {/* Mes défis */}
      <View className="px-6 mb-4">
        <Text className="text-[24px] font-bold text-gray-900">
          Mes défis
        </Text>
      </View>

      <View className="px-6">

        <ChallengeCard
          title="Écrire un journal"
          progress={1}
          status="Terminé"
          color="#F2C94C"
          finished={true}
        />

        <ChallengeCard
          title="Course à pied en famille"
          progress={0.30}
          status="En cours…"
          color="#A259FF"
        />

        <ChallengeCard
          title="Déconnexion numérique"
          progress={0.75}
          status="En cours…"
          color="#A259FF"
        />

      </View>

    </ScrollView>
  );
}
