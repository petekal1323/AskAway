import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const DepthScreen = ({ route, navigation }) => {
    const { relationship } = route.params;

    return (
        <LinearGradient colors={['#FF7E5F', '#FEB47B']} style={styles.gradient}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Select Depth</Text>
                    <View style={{ width: 40 }} />
                </View>
                <View style={styles.container}>
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
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
        boxShadowColor: '#000',
        boxShadowOffset: { width: 0, height: 2 },
        boxShadowOpacity: 0.2,
        boxShadowRadius: 2,
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