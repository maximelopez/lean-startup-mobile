import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Image } from 'react-native';
import ScoreCard from '@/components/ScoreCard';
import DonutProgress from '../components/DonutProgress';
import { useSelector } from 'react-redux';
import icon1 from '../assets/icons/dashboard-icon1.png';
import icon2 from '../assets/icons/dashboard-icon2.png';
import icon3 from '../assets/icons/dashboard-icon3.png';

export default function Score() {
    const userState = useSelector((state: any) => state.user);
    const { score } = userState.user;

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <ScrollView>

                <View className='mx-4'>
                    <Text className="text-center text-[32px] font-bold mt-4 mb-4">
                        Ton score bien-être
                    </Text>
                    <Text className='text-center text-gray-500 text-[12px] mb-10'>
                        Les scores sont calculés à partir de tes activités et ressentis. Tu peux les ajuster dans ton profil.
                    </Text>
                    <View className='flex-row gap-4'>
                        <DonutProgress score={score} progress={score / 100} size={150} thickness={25} />
                        <View className='mt-4'>
                            <Text className='font-bold mb-2'>Ce qui t’a fait du bien :</Text>
                            <Text className='mb-2'>🍳 Cuisine → +8 pts</Text>
                            <Text className='mb-2'>🚶‍ Balade en famille → +10 pts</Text>
                            <Text className='mb-2'>📚 Lecture → +6 pts</Text>
                            <Text className='mb-2'>🎮 Jeu en ligne → +4 pt</Text>
                        </View>
                    </View>
                </View>

                <View className="mx-6">
                    <Text className="text-center text-[32px] font-bold mb-4">
                        Tableau de bord
                    </Text>
                    <Text className=" font-bold mb-4">
                        Famille Bruneau
                    </Text>
                    <Text className=" font-bold text-gray-400 mb-4">
                        Résultat de cette semaine
                    </Text>
                    <View className='flex-row gap-[12px] justify-between items-center mb-[15px]'>
                        <View className='bg-white bg-[#FFF200] w-[100px] h-[100px] rounded-[15px] items-center justify-center'>
                            <Image source={icon1} className='w-[16px] h-[16px]' />
                            <Text className='text-[20px] font-bold'>+23%</Text>
                            <Text className='text-[12px] font-bold'>progression</Text>
                        </View>
                        <View className='bg-white bg-[#FFF200] w-[120px] h-[120px] rounded-[15px] items-center justify-center'>
                            <Image source={icon2} className='w-[20px] h-[20px]' />
                            <Text className='text-[20px] font-bold'>18</Text>
                            <Text className='text-[12px] font-bold'>jours actifs</Text>
                        </View>
                        <View className='bg-white bg-[#FFF200] w-[100px] h-[100px] rounded-[15px] items-center justify-center'>
                            <Image source={icon3} className='w-[16px] h-[16px]' />
                            <Text className='text-[20px] font-bold'>12/15</Text>
                            <Text className='text-[12px] font-bold'>objectifs</Text>
                        </View>
                    </View>

                    <View className='flex gap-[16px]'>
                        <ScoreCard name='Thomas' role='Papa' avatar='https://randomuser.me/api/portraits/men/32.jpg' />
                        <ScoreCard name='Elizabeth' role='Maman' avatar='https://randomuser.me/api/portraits/women/32.jpg' />
                        <ScoreCard name='Chloé' role='Fille' avatar='https://randomuser.me/api/portraits/women/11.jpg' />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}