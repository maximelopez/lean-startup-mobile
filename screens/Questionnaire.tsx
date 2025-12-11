import { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Alert } from 'react-native';
import RatingQuestion from '../components/RatingQuestion';
import { useNavigation } from '@react-navigation/native';

export default function Questionnaire() {
    const navigation = useNavigation<any>();

    const [question1, setQuestion1] = useState(0);
    const [question2, setQuestion2] = useState(0);

    const handleSubmit = () => {
    if (!question1 || !question2) {
        Alert.alert("Erreur", "Merci de répondre à toutes les questions");
        return;
    }

    navigation.reset({
        index: 0,
        routes: [
            {
                name: "AppTabs",
                params: { message: "questionnaire rempli" }
            }
        ]
    });
};

    return (
        <SafeAreaView className="flex-1 bg-white p-6">
            <Text className="text-xl font-bold mb-6">Questionnaire</Text>

            <RatingQuestion 
                label="Comment évalues-tu ta journée ?"
                value={question1}
                onChange={setQuestion1}
            />

            <RatingQuestion 
                label="Ton niveau d’énergie ?"
                value={question2}
                onChange={setQuestion2}
            />

            <TouchableOpacity 
                onPress={handleSubmit}
                className="bg-purple-700 p-4 rounded-xl mt-10"
            >
                <Text className="text-white text-center font-semibold">
                    Valider
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
