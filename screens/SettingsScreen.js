// screens/SettingsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, ScrollView, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
    const [apiKey, setApiKey] = useState('');
    const [useAI, setUseAI] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const savedApiKey = await AsyncStorage.getItem('openai_api_key');
            const savedUseAI = await AsyncStorage.getItem('use_ai');

            if (savedApiKey) setApiKey(savedApiKey);
            if (savedUseAI) setUseAI(savedUseAI === 'true');
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    };

    const saveSettings = async () => {
        setIsSaving(true);
        try {
            await AsyncStorage.setItem('openai_api_key', apiKey);
            await AsyncStorage.setItem('use_ai', useAI.toString());
            await AsyncStorage.removeItem('seen_questions');
            Alert.alert('Success', 'Settings saved successfully!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
        } catch (error) {
            console.error('Error saving settings:', error);
            Alert.alert('Error', 'Failed to save settings. Please try again.');
        } finally { setSaving(false); }
    };

    return (
        <LinearGradient colors={['#8E2DE2', '#4A00E0']} style={styles.gradient}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Settings</Text>
                    <View style={styles.placeholderView} />
                </View>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>AI Question Generation</Text>

                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Use AI for Questions</Text>
                            <Switch
                                value={useAI}
                                onValueChange={setUseAI}
                                trackColor={{ false: '#d3d3d3', true: '#8E2DE2' }}
                                thumbColor={useAI ? '#ffffff' : '#f4f3f4'}
                            />
                        </View>

                        {useAI && (
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>OpenAI API Key</Text>
                                <TextInput
                                    style={styles.input}
                                    value={apiKey}
                                    onChangeText={setApiKey}
                                    placeholder="Enter your OpenAI API key"
                                    placeholderTextColor="#999"
                                    secureTextEntry={Platform.OS !== 'web'}
                                />
                                <Text style={styles.helperText}>
                                    Get your API key from openai.com/api-keys
                                </Text>
                            </View>
                        )}

                        <Text style={styles.infoText}>
                            When AI generation is enabled, AskAway will create fresh, unique questions
                            for every session using OpenAI. This requires an internet connection and a
                            valid API key.
                        </Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Question Preference</Text>
                        <Text style={styles.infoText}>
                            AskAway generates completely random questions for each session to ensure
                            you always get fresh content. Even with AI disabled, the app will shuffle and
                            prioritize questions you haven't seen recently.
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.saveButton, (useAI && !apiKey) ? styles.disabledButton : null]}
                        onPress={saveSettings}
                        disabled={useAI && !apiKey}
                    >
                        <Text style={styles.saveButtonText}>
                            {isSaving ? 'Saving...' : 'Save Settings'}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    backButton: {
      padding: 8,
    },
    placeholderView: {
      width: 40, // Same width as back button for centering
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },
    scrollView: {
      flex: 1,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      ...Platform.select({
        web: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)'
        },
        default: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }
      }),
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      marginBottom: 16,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    switchLabel: {
      fontSize: 16,
      color: '#333',
    },
    inputContainer: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 16,
      color: '#333',
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: '#333',
      backgroundColor: '#f9f9f9',
    },
    helperText: {
      fontSize: 12,
      color: '#666',
      marginTop: 4,
    },
    infoText: {
      fontSize: 14,
      color: '#666',
      lineHeight: 20,
      marginTop: 8,
    },
    saveButton: {
      backgroundColor: '#8E2DE2',
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 40,
    },
    disabledButton: {
      backgroundColor: '#ccc',
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  export default SettingsScreen;
