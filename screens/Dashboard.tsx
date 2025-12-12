import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

export default function Dashboard() {
    return (
        <SafeAreaView className="flex-1" edges={['top']}>
                <View className='flex-1 justify-center items-center bg-[#F7F6F3]'>
                    <Text className='font-bold text-[24px]'>Dashboard</Text>
                    <Text className='text-[20px]'>Bientôt disponible</Text>
                </View>
        </SafeAreaView>
    )
}