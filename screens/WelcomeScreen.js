// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#0f2027', '#203a43', '#2c5364']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Ask-Away!</Text>
        <Text style={styles.subtitle}>
          AskAway helps you spark a conversation by generating engaging ice breaker questions.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Relationship')}
        >
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    outlineStyle: 'hidden',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#2c5364',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
