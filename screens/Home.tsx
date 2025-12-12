import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import DonutProgress from '../components/DonutProgress';
import ChallengeCard from "../components/ChallengeCard";
import WeeklyChallengeCard from '@/components/WeeklyChallengeCard';
import { useSelector } from 'react-redux';
import logo from '../assets/images/tribu-home.png';
import defi1 from '../assets/images/defi1.png'
import defi2 from '../assets/images/defi2.png'

export default function Home() {
  const {name, score } = useSelector((state: any) => state.user.user);

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <ScrollView
        className="flex-1 bg-[#F7F6F3]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className='px-6 mt-[14px]'>
          <View className="items-center">
            <Image source={logo} className='w-[146px] h-[62px]' />
          </View>
          
          <View>
            <Text className="text-[28px] font-peachy  @ mb-2">
            Bonjour, {name}
          </Text>

          <Text className="text-[16px] text-gray-700 mb-6">
            Ton score bien-être
          </Text>
          </View> 
        </View>

        <DonutProgress score={score} progress={score / 100} size={200} thickness={35} />

        <View className="px-6 mb-4">
          <Text className="text-[28px] font-peachy text-center">
            Mes défis
          </Text>
        </View>

        <View className="px-6 font-peachy ">

          <ChallengeCard
            title="Écrire un journal"
            progress={1}
            status="Terminé"
            color="#FFCF06"
            finished={true}
          />

          <ChallengeCard
            title="Course à pied en famille"
            progress={0.30}
            status="En cours…"
            color="#6C0FF2"
          />

          <ChallengeCard
            title="Déconnexion numérique"
            progress={0.75}
            status="En cours…"
            color="#6C0FF2"
          />
        </View>

        <View className="px-6 mb-4">
          <Text className="text-[28px] text-center font-peachy">
            Défis hébdomadaires
          </Text>
        </View>

        <View className="flex-row gap-4 justify-center">
          <WeeklyChallengeCard title="Jeu de société" image={defi1} width={108} height={89} />
          <WeeklyChallengeCard title="Randonnée en famille" image={defi2}  width={93} height={77} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
