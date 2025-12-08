import React from 'react';
import { View, Text } from 'react-native';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
      </View>
    </Layout>
  );
}
