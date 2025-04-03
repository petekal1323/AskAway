import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, ScrollView, Alert, Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = ({ navigation }) => {
    const [apiKey, setApiKey] = useState('');
    const [useAI, setUseAI] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async() => {
        try{
            const savedApiKey = awaitAsyncStorage.getItem('apiKey');
            const savedUseAI = await AsyncStorage.getItem('useAi');
            if(savedApiKey) setApiKey(savedApiKey);
            if(savedUseAI) setUseAi(savedUseAI === 'true');
        } catch(error) {
            console.error("Error loading settings:", error);
        }
    }
}
