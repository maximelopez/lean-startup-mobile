import React, { useState } from 'react';
import { View, Text, Image, TextInput, Pressable } from 'react-native';

export default function Profile() {
  const [name, setName] = useState("John Doe");
  const [avatar, setAvatar] = useState("https://cdn-icons-png.flaticon.com/512/847/847969.png");

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 60, backgroundColor: '#f5f5f5' }}>

      {/* AVATAR */}
      <Image
        source={{ uri: avatar }}
        style={{
          width: 140,
          height: 140,
          borderRadius: 70,
          marginBottom: 20,
          borderWidth: 4,
          borderColor: '#007AFF'
        }}
      />

      {/* NOM */}
      <View
        style={{
          width: '80%',
          backgroundColor: '#fff',
          padding: 15,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#ddd',
          marginBottom: 20
        }}
      >
        <Text style={{ fontSize: 14, color: '#777', marginBottom: 6 }}>
          Nom complet
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          style={{
            fontSize: 18,
            color: '#000'
          }}
        />
      </View>

      {/* BOUTON */}
      <Pressable
        style={{
          backgroundColor: '#007AFF',
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 12
        }}
      >
        <Text style={{ fontSize: 18, color: '#fff' }}>Enregistrer</Text>
      </Pressable>

    </View>
  );
}
