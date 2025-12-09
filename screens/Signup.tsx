import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { View, Text, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
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
    if (!name || !email || !password) {
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
    <View className="flex-1 bg-[#4A3983]">

      <View className="flex-1 flex-row items-center justify-center">
        <Text className="text-white text-center">Déjà inscrit ? </Text>
        <TouchableOpacity
          className='bg-[#C6B9EF] rounded-3xl'
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <Text className='px-4 py-2 text-white'>Connectez-vous</Text>
        </TouchableOpacity>
      </View>

      <View className="h-4/5 bg-white rounded-t-3xl p-5 items-center mt-auto">
        <Text className="text-4xl font-bold mb-6 mt-6 text-black">Inscription</Text>
        <Text className="text-gray-500 mb-9 text-center">Saisissez vos informations ci‑dessous</Text>

        <Input
          value={name}
          onChangeText={setName}
          placeholder="Prénom"
        />

        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Adresse mail"
          keyboardType="email-address"
        />

        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Mot de passe"
          secureTextEntry
        />

        {errorMessage && <Text className="text-red-500 mb-3">{errorMessage}</Text>}

        <Button
          title="S'inscrire"
          onPress={handleSignup}
          loading={loading}
        />
      </View>
    </View>
  );
}
