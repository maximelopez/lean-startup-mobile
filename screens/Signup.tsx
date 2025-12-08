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

export default function Signup({ navigation }: Props) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');

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
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Inscription</Text>
      
      <TextInput
        placeholder="Prénom"
        value={name}
        onChangeText={value => setName(value)}
        style={{ width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
      />
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

      <Button title="S'inscrire" onPress={handleSignup} />
      <View style={{ height: 10 }} />
      <Text onPress={() => navigation.navigate('Login')} >Déjà inscrit ? Se connecter</Text>
    </View>
  );
}
