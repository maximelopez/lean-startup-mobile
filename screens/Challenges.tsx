import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

export default function Challenges() {
    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center" edges={['top']}>
            <Text>Challenges</Text>
        </SafeAreaView>
    )
}