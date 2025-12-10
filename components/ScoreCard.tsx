import { View, Text, Image } from 'react-native';

export default function ScoreCard({ name, role, avatar }: any) {
    return (
        <View className='flex-row w-full h-[100px] border border-[#FFCF06] items-center justify-between rounded-[15px] px-[20px]'>
            <View className='flex flex-row items-center gap-[5px]'>
                <View className="w-[65px] h-[65px] rounded-full items-center justify-center bg-[#FFCF06]">
                    <Image
                        source={{ uri: avatar }}
                        className='w-[60px] h-[60px] rounded-full'
                    />
                </View>     
                <View>
                    <Text className='text-[12px]'>{name}</Text>
                    <Text className='text-[12px] text-gray-500'>{role}</Text>
                </View>    
            </View>
            <View className='flex items-center'>
                <Text className='text-[20px]'>80</Text>
                <Text className='text-[12px]'>points</Text>
            </View>
        </View>
    )
};