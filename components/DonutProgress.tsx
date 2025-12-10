// components/DonutProgress.tsx
import React from 'react';
import { View, Text } from 'react-native';

interface DonutProgressProps {
  size?: number;
  thickness?: number;
  progress?: number; // 0 à 1
  score?: number;
}

export default function DonutProgress({
  size = 230,
  thickness = 30,
  progress = 0.75,
  score = 78,
}: DonutProgressProps) {

  const borderBase = "#9333EA"; 
  const borderEmpty = "#E5E5E5";

  const innerSize = size - thickness * 2;

  return (
    <View className="items-center justify-center mb-28">
      <View className="relative">

        {/* Anneau violet */}
        <View
          className="rounded-full"
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: thickness,
            borderColor: borderBase,
            //borderRightColor: borderEmpty,
            borderBottomColor: borderEmpty,
          }}
        />

        {/* Cercle intérieur */}
        <View
          className="absolute bg-white justify-center items-center"
          style={{
            width: innerSize,
            height: innerSize,
            top: thickness,
            left: thickness,
            borderRadius: innerSize / 2,
          }}
        >
          <Text className="text-[38px] font-bold text-purple-700">{score}</Text>
          <Text className="text-[14px] text-gray-600">points</Text>
        </View>

        {/* ————— TEXTES AUTOUR DE L’ANNEAU ————— */}

        {/* Sport — descendu */}
            <View className="absolute top-24 -left-10 bg-white border border-purple-300 rounded-2xl px-4 py-2 shadow-sm z-20">
                <Text className="text-[16px] font-semibold">🏀 Sport</Text>
                <Text className="text-gray-600">+12 pts</Text>
            </View>

            {/* Cuisine — inchangée */}
            <View className="absolute top-10 -right-6 bg-white border border-purple-300 rounded-2xl px-4 py-2 shadow-sm z-20">
                <Text className="text-[16px] font-semibold">🍳 Cuisine</Text>
                <Text className="text-gray-600">+8 pts</Text>
            </View>

            {/* Lecture — plus à gauche */}
            <View className="absolute -bottom-4 left-1/3 -ml-10 bg-white border border-purple-300 rounded-2xl px-4 py-2 shadow-sm z-20">
                <Text className="text-[16px] font-semibold">📘 Lecture</Text>
                <Text className="text-gray-600">+5 pts</Text>
            </View>

      </View>
    </View>
  );
}
