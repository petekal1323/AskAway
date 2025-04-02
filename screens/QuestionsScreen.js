// screens/QuestionsScreen.js

import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const QuestionsScreen = ({ route, navigation }) => {
    const {relationship, depth} = route.params;
    const [questions, setQuestions] = useState([0]);

    const handleNextQuestion = () => {
        setQuestions((prevIndex) => (prevIndex + 1) % questions.length);
    };

    return (
        <>,</>
    );
}