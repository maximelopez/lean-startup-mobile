import { Image, Text, View } from 'react-native';
import { shadows } from "../utils/shadows";

export default function ScoreCard({ name, role, avatar }: any) {
    return (
        <View>
            <View className='bg-white flex-row w-full h-[100px] items-center justify-between rounded-[15px] p-[20px]' style={shadows.custom}>
                <View className='flex flex-row items-center gap-[10px]'>
                    <View className="w-[70px] h-[70px] rounded-full items-center justify-center bg-[#FFCF06]">
                        <Image
                            source={{ uri: avatar }}
                            className='w-[60px] h-[60px] rounded-full'
                        />
                    </View>     
                    <View>
                        <Text className='text-[12px] font-bold'>{name}</Text>
                        <Text className='text-[12px] text-gray-500'>{role}</Text>
                    </View>    
                </View>
                <View className='flex items-center'>
                    <Text className='text-[20px] font-bold'>80</Text>
                    <Text className='text-[12px] font-bold'>points</Text>
                </View>
            </View>
        </View>
    )
};