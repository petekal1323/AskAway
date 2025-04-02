// screens/DepthScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const DepthScreen = ({ route, navigation }) => {
    const { relationship } = route.params;

    return (
        <LinearGradient colors={['#FF7E5F', '#FEB47B']} style={styles.gradient}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>How Deep?</Text>
                <Text style={styles.subtitle}>Choose a question style for {relationship}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate('Questions', {
                            relationship,
                            depth: 'Light Hearted & Fun',
                        })
                    }
                >
                    <Text style={styles.buttonText}>Light Hearted & Fun</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate('Questions', {
                            relationship,
                            depth: 'Serious & Thought Provoking',
                        })
                    }
                >
                    <Text style={styles.buttonText}>Serious & Thought Provoking</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 30,
        textAlign: 'center',
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        width: '80%',
    },
    buttonText: {
        color: '#FF7E5F',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default DepthScreen;
