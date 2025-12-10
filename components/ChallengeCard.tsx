// components/ChallengeCard.tsx
import React from 'react';
import { View, Text } from 'react-native';

interface ChallengeCardProps {
  title: string;
  progress: number; // ex: 0.75
  status?: string;  // "Terminé", "En cours…"
  color?: string;   // couleur de progression ex: "#F2C94C" ou "#A259FF"
  finished?: boolean;
}

export default function ChallengeCard({
  title,
  progress,
  status = "En cours…",
  color = "#A259FF",
  finished = false,
}: ChallengeCardProps) {
  
  const percentage = Math.round(progress * 100);

  return (
    <View className="w-full bg-white border border-purple-300 rounded-3xl p-5 mb-6">

      {/* Titre */}
      <Text className="text-[22px] font-bold mb-4">
        {title}
      </Text>

      <View className="flex-row items-center mb-4">

        {/* Icône circulaire */}
        <View
          className="w-14 h-14 rounded-full justify-center items-center"
          style={{ 
            backgroundColor: finished ? "#F2C94C" : "transparent",
            borderWidth: finished ? 0 : 3,
            borderColor: "#A259FF",
          }}
        >
          {finished && (
            <Text className="text-white text-[24px]">✓</Text>
          )}
          {!finished && (
            <View className="w-3 h-3 rounded-full bg-purple-600" />
          )}
        </View>

        {/* Pourcentage + statut */}
        <View className="ml-4">
          <Text className="text-[20px] font-semibold">
            {percentage}%
            <Text className="text-gray-500 text-[16px] ml-2">   {status}</Text>
          </Text>
        </View>
      </View>

      {/* Barre de progression */}
      <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </View>

    </View>
  );
}
