import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { generateQuestionsWithAI } from '../Services/questionService';

const QuestionsScreen = ({ route, navigation }) => {
  const { relationship, depth } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Generate questions with OpenAI
      const aiQuestions = await generateQuestionsWithAI(relationship, depth, 10);
      setQuestions(aiQuestions);
      setCurrentIndex(0);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to generate questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <LinearGradient colors={['#8E2DE2', '#4A00E0']} style={styles.gradient}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Generating personalized questions...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#8E2DE2', '#4A00E0']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {relationship} - {depth}
          </Text>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={fetchQuestions}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : questions.length > 0 ? (
          <View style={styles.carouselContainer}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardCount}>
                  Question {currentIndex + 1} of {questions.length}
                </Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.questionText}>{questions[currentIndex]}</Text>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.hintText}>Use buttons below to navigate questions</Text>
              </View>
            </View>

            <View style={styles.navigationContainer}>
              <TouchableOpacity
                style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
                onPress={goToPrevQuestion}
                disabled={currentIndex === 0}
              >
                <Ionicons name="chevron-back" size={30} color={currentIndex === 0 ? "#aaa" : "#fff"} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.navButton, currentIndex === questions.length - 1 && styles.disabledButton]}
                onPress={goToNextQuestion}
                disabled={currentIndex === questions.length - 1}
              >
                <Ionicons name="chevron-forward" size={30} color={currentIndex === questions.length - 1 ? "#aaa" : "#fff"} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.generateMoreButton}
              onPress={fetchQuestions}
            >
              <Text style={styles.generateMoreButtonText}>Generate New Questions</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.noQuestionsContainer}>
            <Text style={styles.noQuestionsText}>No questions available</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={fetchQuestions}
            >
              <Text style={styles.retryButtonText}>Generate Questions</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get('window');

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
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    width: '100%',
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    height: "400px",//height * 0.5,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)' }
      : {
          boxShadowColor: "#000",
          boxShadowOffset: { width: 0, height: 4 },
          boxShadowOpacity: 0.3,
          boxShadowRadius: 6,
          elevation: 8,
        }
    ),
  },
  cardHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  cardCount: {
    fontSize: 14,
    color: '#888',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 22,
    color: '#333',
    textAlign: 'center',
    lineHeight: 32,
  },
  cardFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  hintText: {
    fontSize: 12,
    color: '#888',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 30,
  },
  navButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  noQuestionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noQuestionsText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  generateMoreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  generateMoreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QuestionsScreen;