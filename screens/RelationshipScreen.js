// screens/RelationshipScreen.js
import React from 'react'; // Fixed import (uppercase R)
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
                <Text style={styles.title}>Relationship Type</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Depth', { relationship: 'Friends' })}>
                        <Text style={styles.buttonText}>Friends</Text>
                        <Image
                            source={require('../assets/friends.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Depth', { relationship: 'Family' })}>
                        <Text style={styles.buttonText}>Family</Text>
                        <Image
                            source={require('../assets/family.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Depth', { relationship: 'Coworkers' })}>
                        <Text style={styles.buttonText}>Coworkers</Text>
                        <Image
                            source={require('../assets/coworker.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Depth', { relationship: 'Lovers' })}>
                        <Text style={styles.buttonText}>Lovers</Text>
                        <Image
                            source={require('../assets/love-birds.png')}
                            style={styles.icon}
                        />
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#FAF9F6',
        borderRadius: 15,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        width: '45%',
        height: 150,
        marginBottom: 20,
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