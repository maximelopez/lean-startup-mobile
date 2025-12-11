import { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import Constants from "expo-constants";
import logo from '../assets/images/tribu-logo.png';

// Redux
import { useDispatch } from 'react-redux';
import { login } from '@/reducers/user';

type Props = {
  navigation: any;
};

const API_URL = Constants.expoConfig?.extra?.API_URL;

if (!API_URL) console.warn("API_URL is missing in app.config.js or .env");

export default function Login({ navigation }: Props) {
  const [emailInput, setEmailInput] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (! emailInput || !password) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(API_URL + 'users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailInput, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Dispatch pour stocker l'utilisateur connecté
        const { id, name, email, score } = data.user;
        dispatch(login({ id, name, email, score }));
      }

    } catch (error: any) {
      console.error('Erreur login :', error.message);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }

    setLoading(false);
  };

  return (
    <View className='flex-1 bg-white'> 
      <View className="bg-white rounded-t-[30px] p-5 items-center mt-[40px]" >
        <Image source={logo} className='w-[114px] h-[113px]' />
        <Text className="text-4xl font-bold mb-6 text-black">Bon retour</Text>
        <Text className="text-gray-500 mb-9">Saisissez vos informations ci-dessous</Text>
        <View className='w-full gap-[20px] mb-[20px]'>
          <Input
            value={emailInput}
            onChangeText={setEmailInput}
            placeholder="Adresse mail"
            keyboardType="email-address"
          />

          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry
          />
        </View>

        {errorMessage && <Text className="text-red-500 mb-3">{errorMessage}</Text>}
        
        <Button
          title="Se connecter"
          onPress={handleLogin}
          loading={loading}
        />
      </View>
      <View className="flex-1 flex-row items-center justify-center">
        <Text className="text-black text-center mr-[6px]">Pas encore de compte ?</Text>
        <TouchableOpacity
          className='bg-[#6C0FF2] rounded-[15px]'
          onPress={() => navigation.navigate('Signup')} 
          activeOpacity={0.8}>
            <Text className='px-[10px] py-[5px] text-white'>Inscrivez-vous</Text> 
        </TouchableOpacity>
      </View>
    </View>
  );
}
