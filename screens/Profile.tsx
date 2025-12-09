import { View, Text, Image, TouchableOpacity } from "react-native";
import { useAuthStore } from '../store/useAuthStore';

export default function Profile() {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  return (
    <View className="flex-1 items-center bg-white pt-16">
      <Image
        source={{ uri: "https://avatar.iran.liara.run/public/boy?seed=12" }}
        className="w-32 h-32 rounded-full mb-5"
      />
       <Text className="text-2xl font-bold text-gray-900 mb-2">
        {user ? user.name : ""}
      </Text>
      <Text className="text-gray-600 text-lg mb-4">
        {user ? user.email : ""}
      </Text>
      <View className="px-4 py-2 rounded-full bg-blue-100 mt-2">
        <Text className="text-blue-700 font-semibold">
          {user ? user.isPremium ? "Premium" : "Compte Gratuit" : ""}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => logout()}
        className="bg-red-500 px-6 py-3 rounded-xl mt-4"
      >
        <Text className="text-white font-semibold text-lg">
          Se déconnecter
        </Text>
      </TouchableOpacity>
    </View>
  )
}