import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

type Props = {
  navigation: any;
  setIsLoggedIn: (value: boolean) => void;
};

export default function Login({ navigation, setIsLoggedIn }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Connexion</Text>
      
      <TextInput
        placeholder="Email"
        style={{ width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        style={{ width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 }}
      />

      <Button title="Se connecter" onPress={() => setIsLoggedIn(true)} />
      <View style={{ height: 10 }} />
      <Text onPress={() => navigation.navigate('Signup')} >Pas encore de compte ? S'inscrire</Text>
    </View>
  );
}
