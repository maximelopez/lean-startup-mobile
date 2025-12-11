import { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import RatingQuestion from '../components/RatingQuestion';
import { useNavigation } from '@react-navigation/native';

export default function Questionnaire() {
    const navigation = useNavigation<any>();


    // Questions (1–10)
    const [energie, setEnergie] = useState(0);
    const [stress, setStress] = useState(0);
    const [sommeil, setSommeil] = useState(0);
    const [motivation, setMotivation] = useState(0);
    const [alimentation, setAlimentation] = useState(0);
    const [concentration, setConcentration] = useState(0);

    // Questions textuelles
    const [humeur, setHumeur] = useState<string | null>(null);
    const [douleur, setDouleur] = useState<string | null>(null);
    const [tempsExterieur, setTempsExterieur] = useState<string | null>(null);

    // Commentaire libre
    const [commentaire, setCommentaire] = useState("");

    // Bouton stylisé
    const ChoiceButton = ({ label, selected, onPress }: any) => (
        <TouchableOpacity
            onPress={onPress}
            className={`px-4 py-2 rounded-xl mr-3 mb-3 
                ${selected ? "bg-purple-700" : "bg-gray-200"}`}
        >
            <Text className={`${selected ? "text-white" : "text-black"}`}>{label}</Text>
        </TouchableOpacity>
    );

    // Soumission du questionnaire + calcul du score
   const handleSubmit = () => {
    if (
        !energie || !stress || !sommeil || !motivation ||
        !alimentation || !concentration ||
        !humeur || !douleur || !tempsExterieur
    ) {
        Alert.alert("Erreur", "Merci de répondre à toutes les questions");
        return;
    }

    // Calcul brut sur 30
    const total = energie + stress + sommeil + motivation + alimentation + concentration;

    // Conversion sur 100
    const scoreFinal = Math.round((total / 30) * 100);

    console.log("Score final =", scoreFinal); // ← TA VARIABLE FINALE

    navigation.reset({
        index: 0,
        routes: [
            { name: "AppTabs", params: { message: "questionnaire rempli" } }
        ]
    });
};


    return (
        <SafeAreaView className="flex-1 bg-white p-6">
            <ScrollView showsVerticalScrollIndicator={false}>

                <Text className="text-2xl font-bold text-purple-700 mb-2">Bilan Bien-être</Text>
                <Text className="text-gray-600 mb-6">Comment vous sentez-vous aujourd'hui ?</Text>

                {/* 1. Niveau d'énergie */}
                <RatingQuestion 
                    label="1. Niveau d'énergie (1–5)"
                    value={energie}
                    onChange={setEnergie}
                    min={1}
                    max={5}
                />

                {/* 2. Niveau de stress */}
                <RatingQuestion 
                    label="2. Niveau de stress (1–5)"
                    value={stress}
                    onChange={setStress}
                    min={1}
                    max={5}
                />

                {/* 3. Qualité du sommeil */}
                <RatingQuestion 
                    label="3. Qualité du sommeil (1–5)"
                    value={sommeil}
                    onChange={setSommeil}
                    min={1}
                    max={5}
                />

                {/* 4. Humeur générale */}
                <Text className="text-base font-semibold mb-2">4. Humeur générale</Text>
                <View className="flex-row flex-wrap">
                    {["Très mauvaise", "Mauvaise", "Neutre", "Bonne", "Très bonne"].map(option => (
                        <ChoiceButton
                            key={option}
                            label={option}
                            selected={humeur === option}
                            onPress={() => setHumeur(option)}
                        />
                    ))}
                </View>

                {/* 5. Motivation */}
                <RatingQuestion 
                    label="5. Niveau de motivation (1–5)"
                    value={motivation}
                    onChange={setMotivation}
                    min={1}
                    max={5}
                />

                {/* 6. Douleur physique */}
                <Text className="text-base font-semibold mb-2">6. Douleur physique</Text>
                <View className="flex-row flex-wrap">
                    {["Aucune", "Légère", "Modérée", "Forte"].map(option => (
                        <ChoiceButton
                            key={option}
                            label={option}
                            selected={douleur === option}
                            onPress={() => setDouleur(option)}
                        />
                    ))}
                </View>

                {/* 7. Temps extérieur */}
                <Text className="text-base font-semibold mb-2">7. Temps à l’extérieur</Text>
                <View className="flex-row flex-wrap">
                    {["0", "<30 min", "30-60 min", ">1h"].map(option => (
                        <ChoiceButton
                            key={option}
                            label={option}
                            selected={tempsExterieur === option}
                            onPress={() => setTempsExterieur(option)}
                        />
                    ))}
                </View>

                {/* 8. Alimentaire */}
                <RatingQuestion 
                    label="8. Qualité alimentation (1–5)"
                    value={alimentation}
                    onChange={setAlimentation}
                    min={1}
                    max={5}
                />

                {/* 9. Concentration */}
                <RatingQuestion 
                    label="9. Taux de concentration (1–5)"
                    value={concentration}
                    onChange={setConcentration}
                    min={1}
                    max={5}
                />

                {/* Commentaire */}
                <Text className="text-base font-semibold mb-2">Commentaire (optionnel)</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-3 mb-6"
                    placeholder="Note quelque chose ici..."
                    multiline
                    value={commentaire}
                    onChangeText={setCommentaire}
                />

                {/* Submit */}
                <TouchableOpacity 
                    onPress={handleSubmit}
                    className="bg-purple-700 p-4 rounded-xl mt-4 mb-20"
                >
                    <Text className="text-white text-center font-semibold text-lg">
                        Valider
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
