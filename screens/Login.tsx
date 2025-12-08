import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
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
    <View className="flex-1 justify-center items-center p-5 bg-white">
      <Text className="text-2xl font-bold mb-5 text-blue-600">Connexion</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={value => setEmail(value)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        className="w-full border border-gray-300 rounded-md px-4 py-3 mb-3"
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={value => setPassword(value)}
        autoCapitalize="none"
        secureTextEntry
        className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4"
      />

      {errorMessage && <Text className="text-red-500 mb-3">{errorMessage}</Text>}
      
      <TouchableOpacity className="w-full bg-blue-600 rounded-md py-3 mb-3" onPress={handleLogin}>
        <Text className="text-white text-center font-semibold">Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text className="text-blue-600 mt-2">Pas encore de compte ? S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
}
