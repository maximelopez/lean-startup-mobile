import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { View, Text, Button, TextInput } from 'react-native';
import Constants from "expo-constants";

type Props = {
  navigation: any;
};

const API_URL = Constants.expoConfig?.extra?.API_URL;

if (!API_URL) {
  console.warn("⚠️ API_URL is missing in app.config.js or .env");
}

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (! email || !password) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await fetch(API_URL + 'users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.user && data.token) {
        login(data.user, data.token);
      } else {
        setErrorMessage(data.error || data.message || 'Identifiants incorrects.');
      }

    } catch (error: any) {
      console.error('Erreur login :', error.message);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Connexion</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={value => setEmail(value)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={{ width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={value => setPassword(value)}
        secureTextEntry
        style={{ width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 }}
      />

      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <View style={{ height: 10 }} />

      <Button title="Se connecter" onPress={handleLogin} />
      <View style={{ height: 10 }} />
      <Text onPress={() => navigation.navigate('Signup')} >Pas encore de compte ? S'inscrire</Text>
    </View>
  );
}
