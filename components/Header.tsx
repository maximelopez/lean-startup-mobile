import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

interface HeaderProps {
  onAvatarPress: () => void;
}

export default function Header({ onAvatarPress }: HeaderProps) {
  return (
    <View
      style={{
        height: 60,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        MonApp
      </Text>

      <Pressable onPress={onAvatarPress}>
        <Image
          source={{ uri: 'https://placekitten.com/200/200' }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20
          }}
        />
      </Pressable>
    </View>
  );
}
