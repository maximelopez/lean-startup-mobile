import React, { ReactNode } from 'react';
import { View } from 'react-native';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <View style={{ flex: 1 }}>
      <Header onAvatarPress={() => console.log('Avatar pressed')} />
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}
