import { View, Text, Image, TouchableOpacity } from "react-native";
import { useAuthStore } from '../store/useAuthStore';

export default function Profile() {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  return (
    <View className="flex-1 items-center bg-white pt-20 px-6">
      <Image
        source={{ uri: "https://avatar.iran.liara.run/public/boy?seed=12" }}
        className="w-32 h-32 rounded-full mb-5"
      />

      <Text className="text-2xl font-bold text-gray-900 mb-2">
        {user?.name || "Invité"}
      </Text>

      <Text className="text-gray-600 text-lg mb-4">
        {user?.email || ""}
      </Text>

      <View className="px-6 py-2 rounded-full bg-blue-100 mt-2 mb-8">
        <Text className="text-blue-700 font-semibold text-center">
          {user?.isPremium ? "Premium" : "Compte Gratuit"}
        </Text>
      </View>

      {!user?.isPremium && (
        <TouchableOpacity className="w-full bg-yellow-400 mb-6 py-3 rounded-xl mt-3" activeOpacity={0.8}>
          <Text className="text-center font-semibold text-white">Devenir Premium</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => logout()}
        className="w-full bg-red-500 py-3 rounded-xl"
        activeOpacity={0.8}
      >
        <Text className="text-white font-semibold text-center text-lg">
          Se déconnecter
        </Text>
      </TouchableOpacity>
    </View>
  )
}
