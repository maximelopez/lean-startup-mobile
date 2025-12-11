import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

type DashboardRouteParams = {
    message?: string;
};

export default function Dashboard() {
    const navigation = useNavigation<any>();
    const route = useRoute() as { params?: DashboardRouteParams };

    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center" edges={['top']}>

            {route.params?.message && (
                <Text className="text-green-600 mb-4 font-semibold">
                    {route.params.message}
                </Text>
            )}

            <Text className="text-2xl font-bold mb-6">Dashboard</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("Questionnaire")}
                className="bg-purple-700 px-6 py-3 rounded-xl"
            >
                <Text className="text-white font-semibold">Lancer le questionnaire</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
