import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

export default function Dashboard() {
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <Text>Dashboard</Text>
        </SafeAreaView>
    )
}