import React from 'react';
import { View } from 'react-native';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <View style={{ flex: 1 }}>
      <Header onAvatarPress={() => console.log('Avatar pressed')} />
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}
