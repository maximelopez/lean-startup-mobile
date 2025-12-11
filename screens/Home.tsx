import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Image } from 'react-native';
import DonutProgress from '../components/DonutProgress';
import ChallengeCard from "../components/ChallengeCard";
import { useSelector } from 'react-redux';
import logo from '../assets/images/tribu-home.png';

export default function Home() {
  const {name, score } = useSelector((state: any) => state.user.user);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >

        {/* Header */}
        <View className='px-6'>
          <View className="items-center mt-10">
            <Image source={logo} className='w-[146px] h-[62px]' />
          </View>
          
          <View>
            <Text  style={{ fontFamily: "Peachy" }} className="text-[28px] text-gray-900 mb-2">
            Bonjour, {name}
          </Text>

          <Text className="text-[16px] text-gray-700 mb-6">
            Ton score bien-être
          </Text>
          </View> 
        </View>

        {/* Donut */}
        <DonutProgress score={score} progress={score / 100} activities={true} />

        {/* Mes défis */}
        <View className="px-6 mb-4">
          <Text style={{ fontFamily: "Peachy" }} className="text-[24px] text-gray-900 text-center">
            Mes défis
          </Text>
        </View>

        <View className="px-6">

          <ChallengeCard
          
            title="Écrire un journal"
            progress={1}
            status="Terminé"
            color="#FFF200"
            finished={true}
          />

          <ChallengeCard
            title="Course à pied en famille"
            progress={0.30}
            status="En cours…"
            color="#A259FF"
          />

          <ChallengeCard
            title="Déconnexion numérique"
            progress={0.75}
            status="En cours…"
            color="#A259FF"
          />

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
