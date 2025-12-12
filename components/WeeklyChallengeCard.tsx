import { Image, Text, TouchableOpacity, View } from 'react-native';
import { shadows } from "../utils/shadows";

export default function WeeklyChallengeCard({ title, image, width, height }: any) {
    return (
        <View 
            className='w-[172px] bg-white rounded-[15px] p-[12px]'
            style={shadows.custom}
        >
            <View className='flex w-full items-center'>
                <Image source={image} style={{ width: width, height: height }} />
            </View>      
            <Text className='font-peachy text-[20px]'>{title}</Text>
            <Text className='font-outfit text-[16px] mb-2'>Lorem ipsum dolor sit amet</Text>
            <View className='flex-row justify-between'>
                <View>
                    <Text className='text-[#757575] text-[10px]'>12 familles</Text>
                    <Text className='text-[#757575] text-[10px]'>3 jours</Text>
                </View>
                <TouchableOpacity 
                    className='bg-[#6C0FF2] rounded-[15px]'
                    activeOpacity={0.8}
                >
                <Text className='text-white text-[12px] px-4 py-2'>Participer</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};