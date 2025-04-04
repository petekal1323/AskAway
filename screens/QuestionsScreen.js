// screens/QuestionsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { generateQuestions } from '../Services/openai';
import questionDatabase from '../data/questionDatabase';
const QuestionsScreen = ({ route, navigation }) => {
  const { relationship, depth } = route.params;
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [useAI, setUseAI] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  useEffect(() => {
    loadSettings();
  }, [relationship, depth]);
  const loadSettings = async () => {
    try {
      const savedUseAI = await AsyncStorage.getItem('use_ai');
      const useAIValue = savedUseAI === 'true';
      setUseAI(useAIValue);

      if (useAIValue) {
        loadAIQuestions();
      } else {
        loadStaticQuestions();
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      loadStaticQuestions();
    }
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const loadStaticQuestions = () => {
    try {
      const relationshipQuestions = questionDatabase[relationship][depth];
      let seenQuestions = [];
      try {
        const seenQuestionsJson = AsyncStorage.getItem('seen_questions');
        if (seenQuestionsJson) {
          seenQuestions = JSON.parse(seenQuestionsJson);
        }
      } catch (error) {
        console.error('Error loading seen questions:', error);
      }

      const unseenQuestions = relationshipQuestions.filter(q => !seenQuestions.includes(q));

      const questionsToUse = unseenQuestions.length > 0 ? unseenQuestions : relationshipQuestions;
      const shuffledQuestions = shuffleArray(questionsToUse);
      const selectedQuestions = shuffledQuestions.slice(0, 10);
      const updatedSeenQuestions = [...seenQuestions, ...selectedQuestions].slice(0, 100);

      await AsyncStorage.setItem('seen_questions', JSON.stringify(updatedSeenQuestions));

      setQuestions(selectedQuestions);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading static questions:', error);
      setQuestions([]);
      setIsLoading(false);
    }
  };

  // generate questions using OpenAI - always creates fresh questions
  const loadAIQuestions = async () => {
    setIsGeneratingAI(true);
    try {
      const apiKey = await AsyncStorage.getItem('openai_api_key');
      if (!apiKey) {
        throw new Error('API key is required');
      }
      const aiQuestions = await generateQuestions(relationship, depth, apiKey);
      setQuestions(aiQuestions);
    } catch (error) {
      console.error('Error generating AI questions:', error);
      Alert.alert(
        'Error Generating Questions',
        'Failed to generate AI questions. Falling back to static questions.',
        [{ text: 'OK' }]
      );
      loadStaticQuestions();
    } finally {
      setIsGeneratingAI(false);
      setIsLoading(false);
    }
  };


  const handleSwipeLeft = (cardIndex) => {
    // Next question
    setCurrentCardIndex(cardIndex + 1);
    console.log("Swiped left for next question");
  };

  const openSettings = () => {
    navigation.navigate('Settings');
  };

  const handleRegenerateQuestions = () => {
    setIsLoading(true);
    setCurrentCardIndex(0);
    if (useAI) {
      loadAIQuestions();
    } else {
      loadStaticQuestions();
    }
  };

   if (isLoading) {
    return (
      <LinearGradient colors={['#8E2DE2', '#4A00E0']} style={styles.gradient}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.headerText}>
            {relationship} - {depth}
          </Text>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>
              {isGeneratingAI
                ? 'Generating AI questions...'
                : 'Loading questions...'}
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
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
          <Text style={styles.headerText}>
            {relationship} - {depth}
          </Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={openSettings}
          >
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.swiperContainer}>
          {questions.length > 0 ? (
            <Swiper
              cards={questions}
              renderCard={(card) => (
                <View style={styles.card}>
                  <Text style={styles.questionText}>{card}</Text>
                  {useAI && (
                    <View style={styles.aiIndicator}>
                      <Text style={styles.aiIndicatorText}>AI Generated</Text>
                    </View>
                  )}
                </View>
              )}
              onSwipedLeft={handleSwipeLeft}
              cardIndex={currentCardIndex}
              backgroundColor="transparent"
              stackSize={1}
              disableBottomSwipe={true}
              disableTopSwipe={true}
              disableRightSwipe={true}
              verticalSwipe={false}
              cardHorizontalMargin={20}
              cardVerticalMargin={10}
              animateCardOpacity
              inputRotationRange={[-10, 0, 10]}
              outputRotationRange={['-3deg', '0deg', '3deg']}
              swipeAnimationDuration={300}
              useViewOverflow={Platform.OS === 'web' ? false : true}
              animationOptions={{
                isInteraction: false,
              }}
              overlayLabels={{
                left: {
                  title: 'NEXT',
                  style: {
                    label: {
                      backgroundColor: 'transparent',
                      color: 'white',
                      fontSize: 14
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                      marginTop: 30,
                      marginLeft: -30
                    }
                  }
                }
              }}
            />
          ) : (
            <View style={styles.card}>
              <Text style={styles.questionText}>No questions available</Text>
            </View>
          )}
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.instructionText}>
            Swipe left for next question
          </Text>

          <TouchableOpacity
            style={styles.regenerateButton}
            onPress={handleRegenerateQuestions}
          >
            <Ionicons name="refresh-outline" size={18} color="#fff" />
            <Text style={styles.regenerateText}>New Questions</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  settingsButton: {
    padding: 8,
  },
  swiperContainer: {
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width - 48,
    height: height * 0.55,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)'
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5
      }
    }),
  },
  questionText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    lineHeight: 32,
  },
  aiIndicator: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(142, 45, 226, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  aiIndicatorText: {
    fontSize: 12,
    color: '#8E2DE2',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 15,
    fontSize: 16,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  instructionText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 8,
  },
  regenerateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 8,
  },
  regenerateText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  }
});
export default QuestionsScreen;