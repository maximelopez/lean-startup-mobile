import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/reducers/user';

export default function Profile() {
  const userState = useSelector((state: any) => state.user);
  const { name, email } = userState.user;

  const dispatch = useDispatch();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView
          className="flex-1 bg-white"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
        <View className="flex-2 items-center bg-white pt-20 px-6">
          <Image
            source={{ uri: "https://avatar.iran.liara.run/public/boy?seed=12" }}
            className="w-32 h-32 rounded-full mb-5"
          />
          <Text className="text-2xl font-bold text-gray-900 mb-2">{name}</Text>
          <Text className="text-gray-600 text-lg mb-4">{email}</Text>
          
          <View className="w-full flex-row gap-4">

            {/* COLONNE GAUCHE */}
            <View className="flex-1">

              {/* Haut gauche — plus court */}
              <View
                className="bg-white p-4 rounded-3xl border border-gray-200 mb-4"
                style={{ height: 150 }}
              >
                <Text className="text-gray-600 text-lg mb-2">Cuisine</Text>
                <Text className="text-gray-900 text-3xl font-bold mb-1">8 pts</Text>
                <Text className="text-gray-600 text-sm">+ 12% from last month</Text>
              </View>

              {/* Bas gauche — plus long */}
              <View
                className="bg-white p-4 rounded-3xl border border-gray-200"
                style={{ height: 220 }}
              >
                <Text className="text-gray-600 text-lg mb-2">Développement personnel</Text>
                <Text className="text-gray-900 text-3xl font-bold mb-1">0 pts</Text>
                <Text className="text-gray-600 text-sm">- 14% from last month</Text>
              </View>

            </View>



            {/* COLONNE DROITE */}
            <View className="flex-1">

              {/* Haut droit — plus long */}
              <View
                className="p-4 rounded-3xl mb-4"
                style={{ backgroundColor: "#F2C94C", height: 220 }}
              >
                <Text className="text-white text-lg mb-2">Sport</Text>
                <Text className="text-white text-3xl font-bold mb-1">12 pts</Text>

                <View className="bg-white/40 px-3 py-1 rounded-full self-start mb-3">
                  <Text className="text-white">15% ↓</Text>
                </View>

              </View>

              {/* Bas droit — plus court */}
              <View
                className="p-4 rounded-3xl"
                style={{ backgroundColor: "#6B21A8", height: 150 }}
              >
                <Text className="text-white text-lg mb-2">Lecture</Text>
                <Text className="text-white text-3xl font-bold mb-1">5 pts</Text>

                <View className="bg-white/40 px-3 py-1 rounded-full self-start mb-3">
                  <Text className="text-white">12% ↑</Text>
                </View>

              </View>

            </View>

          </View>

          <View className="w-full px-4 mt-4 mb-8">

            {/* Titre */}
            <Text className="text-3xl font-black mb-8 mt-4">
              Mes thématiques
            </Text>

            {/* Ligne 1 */}
            <View className="flex-row gap-4 mb-4">
              <View className="flex-1 border-2 border-purple-600 rounded-3xl p-6 justify-center items-center">
                <Text className="text-purple-600 text-lg font-medium">
                  Cuisine & Nutrition
                </Text>
              </View>

              <View className="flex-1 border-2 border-purple-600 rounded-3xl p-6 justify-center items-center">
                <Text className="text-purple-600 text-lg font-medium">
                  Sport & Activités
                </Text>
              </View>
            </View>

            {/* Ligne 2 */}
            <View className="flex-row gap-4 mb-4">
              <View className="flex-1 border-2 border-purple-600 rounded-3xl p-6 justify-center items-center">
                <Text className="text-purple-600 text-lg font-medium">
                  Lecture & Culture
                </Text>
              </View>

              <View className="flex-1 border-2 border-purple-600 rounded-3xl p-6 justify-center items-center">
                <Text className="text-purple-600 text-lg font-medium">
                  Vie sociale
                </Text>
              </View>
            </View>

  {/* Ligne 3 (pleine largeur) */}
  <View className="border-2 border-purple-600 rounded-3xl p-6 justify-center items-center">
    <Text className="text-purple-600 text-lg font-medium">
      Développement personnel
    </Text>
  </View>

</View>


          <TouchableOpacity
              onPress={() => dispatch(logout())}
              className="w-full py-3 rounded-xl bg-white"
              style={{ borderWidth: 2, borderColor: "#6B21A8" }}
              activeOpacity={0.8}
              >
              <Text
                className="font-semibold text-center text-lg"
                style={{ color: "#6B21A8" }}
              >
                Se déconnecter
              </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
      
    </SafeAreaView>
    
  )
}
