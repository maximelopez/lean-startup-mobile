import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



export default function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  colors = ['#4A3983', '#4A3983', '#C6B9EF'],
}: any) {
  const isDisabled = loading || disabled;

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      activeOpacity={0.8}
      style={{ width: '100%', borderRadius: 24, overflow: 'hidden', height: 56, marginBottom: 12 }}
    >
      <LinearGradient
        colors={
          isDisabled
            ? ['#4A3983', '#4A3983', '#C6B9EF']
            : colors
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-bold text-xl">
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
