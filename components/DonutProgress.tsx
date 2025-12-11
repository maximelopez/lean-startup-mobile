import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
} from 'react-native-reanimated';

interface DonutProgressProps {
  size?: number;
  thickness?: number;
  progress: number;
  score?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function DonutProgress({
  size = 200,
  thickness = 30,
  progress,
  score,
}: DonutProgressProps) {

  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  // valeur animée de 0 à progress
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 800 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedProgress.value),
  }));

  const innerSize = size - thickness * 2;

  return (
    <View className="items-center justify-center mb-10">
      <View className="relative">

        {/* SVG donut */}
        <Svg width={size} height={size}>

          {/* Cercle gris */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E5E5"
            strokeWidth={thickness}
            fill="none"
          />

          {/* Cercle violet animé */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#9333EA"
            strokeWidth={thickness}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>

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

        {/* — TES BLOCS COMMENTÉS — */}

        {/* Sport — descendu */}
        {/* <View className="absolute top-24 -left-10 bg-white border border-purple-300 rounded-2xl px-4 py-2 shadow-sm z-20">
          <Text className="text-[16px] font-semibold">🏀 Sport</Text>
          <Text className="text-gray-600">+12 pts</Text>
        </View> */}

        {/* Cuisine — inchangée */}
        {/* <View className="absolute top-10 -right-6 bg-white border border-purple-300 rounded-2xl px-4 py-2 shadow-sm z-20">
          <Text className="text-[16px] font-semibold">🍳 Cuisine</Text>
          <Text className="text-gray-600">+8 pts</Text>
        </View> */}

        {/* Lecture — plus à gauche */}
        {/* <View className="absolute -bottom-4 left-1/3 -ml-10 bg-white border border-purple-300 rounded-2xl px-4 py-2 shadow-sm z-20">
          <Text className="text-[16px] font-semibold">📘 Lecture</Text>
          <Text className="text-gray-600">+5 pts</Text>
        </View> */}

      </View>
    </View>
  );
}
