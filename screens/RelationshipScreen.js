import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const RelationshipScreen = ({ navigation }) => {
    return (
        <LinearGradient
            colors={['#FF4b33', '#FF9082']}
            style={styles.gradient}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>Relationship Type</Text>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('Depth', { relationship: 'Friends' })}
                            >
                                <Text style={styles.buttonText}>Friends</Text>
                                <Image
                                    source={require('../assets/friends.png')}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('Depth', { relationship: 'Family' })}
                            >
                                <Text style={styles.buttonText}>Family</Text>
                                <Image
                                    source={require('../assets/family.png')}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('Depth', { relationship: 'Coworkers' })}
                            >
                                <Text style={styles.buttonText}>Coworkers</Text>
                                <Image
                                    source={require('../assets/coworker.png')}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('Depth', { relationship: 'Lovers' })}
                            >
                                <Text style={styles.buttonText}>Lovers</Text>
                                <Image
                                    source={require('../assets/love-birds.png')}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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
    },
    title: {
        fontSize: 26,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        gap: 20,
    },
    button: {
        backgroundColor: '#FAF9F6',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        boxShadowColor: '#000',
        boxShadowOffset: { width: 0, height: 2 },
        boxShadowOpacity: 0.2,
        boxShadowRadius: 2,
        elevation: 3,
        width: 140,
        height: 140,
    },
    buttonText: {
        color: '#1f4037',
        fontSize: 18,
        fontWeight: '600',
    },
    icon: {
        width: 60,
        height: 60,
        marginBottom: 10,
    }
});

export default RelationshipScreen;