import React from 'react';
import { TextInput, View, Text } from 'react-native';

export default function Input({
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  secureTextEntry = false,
}: any) {
  return (
    <View className="w-full mb-6">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#C9C9C9"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        selectionColor="#C6B9EF"
        className="w-full border border-gray-200 rounded-3xl p-4"
      />
    </View>
  );
}
