import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import RatingQuestion from '../components/RatingQuestion';

export default function Questionnaire() {
    const navigation = useNavigation<any>();
    const flatListRef = useRef<FlatList>(null);
    const { width } = useWindowDimensions();

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
            className={`px-6 py-3 rounded-xl mr-3 mb-3 
                ${selected ? "bg-purple-700" : "bg-gray-200"}`}
        >
            <Text className={`text-lg ${selected ? "text-white" : "text-black"}`}>{label}</Text>
        </TouchableOpacity>
    );

    // Soumission du questionnaire + calcul du score
    const handleSubmit = () => {
        if (
            !energie || !stress || !sommeil || !motivation ||
            !alimentation || !concentration ||
            !humeur || !douleur || !tempsExterieur
        ) {
            Alert.alert("Oups !", "Il manque quelques réponses pour valider.");
            return;
        }

        // Calcul brut sur 30
        const total = energie + stress + sommeil + motivation + alimentation + concentration;
        const scoreFinal = Math.round((total / 30) * 100);

        console.log("Score final =", scoreFinal);

        navigation.reset({
            index: 0,
            routes: [
                { name: "AppTabs", params: { message: "questionnaire rempli" } }
            ]
        });
    };

    // Configuration des questions
    const questions = [
        {
            id: 'intro',
            type: 'intro',
            title: 'Bilan Bien-être',
            subtitle: "Prenons un moment pour voir comment vous allez aujourd'hui."
        },
        {
            id: 'energie',
            type: 'rating',
            label: "1. Niveau d'énergie",
            value: energie,
            setValue: setEnergie
        },
        {
            id: 'stress',
            type: 'rating',
            label: "2. Niveau de stress",
            value: stress,
            setValue: setStress
        },
        {
            id: 'sommeil',
            type: 'rating',
            label: "3. Qualité du sommeil",
            value: sommeil,
            setValue: setSommeil
        },
        {
            id: 'humeur',
            type: 'choice',
            label: "4. Humeur générale",
            options: ["Très mauvaise", "Mauvaise", "Neutre", "Bonne", "Très bonne"],
            value: humeur,
            setValue: setHumeur
        },
        {
            id: 'motivation',
            type: 'rating',
            label: "5. Niveau de motivation",
            value: motivation,
            setValue: setMotivation
        },
        {
            id: 'douleur',
            type: 'choice',
            label: "6. Douleur physique",
            options: ["Aucune", "Légère", "Modérée", "Forte"],
            value: douleur,
            setValue: setDouleur
        },
        {
            id: 'tempsExterieur',
            type: 'choice',
            label: "7. Temps à l’extérieur",
            options: ["0", "<30 min", "30-60 min", ">1h"],
            value: tempsExterieur,
            setValue: setTempsExterieur
        },
        {
            id: 'alimentation',
            type: 'rating',
            label: "8. Qualité alimentation",
            value: alimentation,
            setValue: setAlimentation
        },
        {
            id: 'concentration',
            type: 'rating',
            label: "9. Taux de concentration",
            value: concentration,
            setValue: setConcentration
        },
        {
            id: 'commentaire',
            type: 'input',
            label: "Commentaire (optionnel)",
            value: commentaire,
            setValue: setCommentaire
        }
    ];

    const nextQuestion = (currentIndex: number) => {
        if (currentIndex < questions.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
        }
    };

    const renderItem = ({ item, index }: any) => {
        return (
            <View style={{ width: width, paddingHorizontal: 20 }} className="flex-1 justify-center">

                {/* Intro Slide */}
                {item.type === 'intro' && (
                    <View className="items-center justify-center space-y-6">
                        <Text className="text-4xl font-bold text-purple-700 text-center">{item.title}</Text>
                        <Text className="text-xl text-gray-600 text-center px-4">{item.subtitle}</Text>
                        <Text className="text-sm text-gray-400 mt-10">Glissez vers la gauche pour commencer →</Text>
                    </View>
                )}

                {/* Question Title */}
                {item.type !== 'intro' && (
                    <Text className="text-2xl font-bold text-purple-800 mb-10 text-center">
                        {item.label}
                    </Text>
                )}

                {/* Rating Questions */}
                {item.type === 'rating' && (
                    <View className="w-full px-6">
                        <RatingQuestion
                            label="" // Label is handled globally above
                            value={item.value}
                            onChange={(val: number) => {
                                item.setValue(val);
                                setTimeout(() => nextQuestion(index), 300);
                            }}
                            min={1}
                            max={5}
                        />
                        <Text className="text-gray-400 text-center text-sm font-medium -mt-2">
                            {item.value ? `Note: ${item.value}/5` : "Touchez une étoile"}
                        </Text>
                    </View>
                )}

                {/* Choice Questions */}
                {item.type === 'choice' && (
                    <View className="flex-row flex-wrap justify-center gap-2">
                        {item.options.map((option: string) => (
                            <ChoiceButton
                                key={option}
                                label={option}
                                selected={item.value === option}
                                onPress={() => {
                                    item.setValue(option);
                                    setTimeout(() => nextQuestion(index), 300);
                                }}
                            />
                        ))}
                    </View>
                )}

                {/* Text Input */}
                {item.type === 'input' && (
                    <View className="w-full">
                        <TextInput
                            className="border border-purple-200 bg-purple-50 rounded-xl p-4 text-lg mb-8 h-40"
                            placeholder="Note quelque chose ici..."
                            placeholderTextColor="#9CA3AF"
                            multiline
                            textAlignVertical="top"
                            value={item.value}
                            onChangeText={item.setValue}
                        />
                        <TouchableOpacity
                            onPress={handleSubmit}
                            className="bg-purple-700 p-5 rounded-2xl shadow-lg shadow-purple-200"
                        >
                            <Text className="text-white text-center font-bold text-xl">
                                Valider mon bilan
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Navigation Hint (except on last slide) */}
                {index < questions.length - 1 && item.type !== 'intro' && (
                    <Text className="text-center text-gray-300 mt-12 text-sm">
                        Suivant ➔
                    </Text>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <FlatList
                    ref={flatListRef}
                    data={questions}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    renderItem={renderItem}
                    initialNumToRender={1}
                    maxToRenderPerBatch={2}
                    windowSize={3}
                    getItemLayout={(data, index) => (
                        { length: width, offset: width * index, index }
                    )}
                    keyboardShouldPersistTaps="handled"
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

