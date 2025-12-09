import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator  } from 'react-native';
import Constants from "expo-constants";

type Props = {
  navigation: any;
};

const API_URL = Constants.expoConfig?.extra?.API_URL;

if (!API_URL) console.warn("API_URL is missing in app.config.js or .env");

export default function Signup({ navigation }: Props) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();

  const handleSignup = async () => {
    if (!name || ! email || !password) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Le mot de passe doit faire au moins 6 caractères.");
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(API_URL + 'users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok && data.user && data.token) {
        login(data.user, data.token);
      } else {
        setErrorMessage(data.error || data.message || 'Impossible de s’inscrire.');
      }

    } catch (error: any) {
      console.error('Erreur signup :', error.message);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }

    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-white">
      <Text className="text-2xl font-bold mb-5 text-blue-600">Inscription</Text>
      
      <TextInput
        placeholder="Prénom"
        value={name}
        onChangeText={value => setName(value)}
        className="w-full border border-gray-300 rounded-md px-4 py-3 mb-3"
      />
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

      <TouchableOpacity
        disabled={loading}
        className={`w-full rounded-md py-3 mb-3 ${loading ? 'bg-blue-300' : 'bg-blue-600'}`}
        onPress={handleSignup}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-semibold">S'inscrire</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text className="text-blue-600 mt-2">Déjà inscrit ? Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}
