import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const progressAnimation = new Animated.Value(0);
  const progressWidth = progressAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    const simulateLoading = () => {
      Animated.timing(progressAnimation, {
        toValue: 100,
        duration: 3000,
        useNativeDriver: false,
      }).start(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
    };

    simulateLoading();
  }, []);

  if (isLoading) {
    return (
      <LinearGradient colors={['#4568DC', '#B06AB3']} style={styles.gradient}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.loadingTitle}>AskAway</Text>
          <Text style={styles.loadingSubtitle}>Starting up...</Text>

          <View style={styles.progressContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressWidth,
                }
              ]}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#4568DC', '#B06AB3']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>AskAway</Text>
          <Text style={styles.subtitle}>
            Build stronger bonds through meaningful conversations
          </Text>

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate('Relationship')}
          >
            <Text style={styles.startButtonText}>Start Connecting</Text>
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
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  // Loading screen styles
  loadingTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 100,
  },
  loadingSubtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  progressContainer: {
    height: 6,
    width: width - 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    marginTop: 40,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default WelcomeScreen;