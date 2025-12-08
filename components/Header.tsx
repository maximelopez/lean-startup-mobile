import React from 'react';
import { View, Image, Pressable } from 'react-native';

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
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 120, height: 40, resizeMode: 'contain' }}
      />

      <Pressable onPress={onAvatarPress}>
        <Image
          source={{ uri: 'https://example.com/avatar.jpg' }}
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
