// screens/QuestionsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import questionDatabase from '../data/questionDatabase';

const QuestionsScreen = ({ route, navigation }) => {
  const { relationship, depth } = route.params;
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    try {
      const relationshipQuestions = questionDatabase[relationship][depth];
      const shuffledQuestions = [...relationshipQuestions].sort(() => 0.5 - Math.random());

      setQuestions(shuffledQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
      setQuestions([]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [relationship, depth]);

  const handleSwipeLeft = (cardIndex) => {
    // Next question
    setCurrentCardIndex(cardIndex + 1);
    console.log("Swiped left for next question");
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
            <Text style={styles.loadingText}>Loading questions...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#8E2DE2', '#4A00E0']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>
          {relationship} - {depth}
        </Text>

        <View style={styles.swiperContainer}>
          {questions.length > 0 ? (
            <Swiper
              cards={questions}
              renderCard={(card) => (
                <View style={styles.card}>
                  <Text style={styles.questionText}>{card}</Text>
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

        <Text style={styles.instructionText}>
          Swipe left for next question
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get('window');

const getCardStyle = () => {
  if (Platform.OS === 'web') {
    return {
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)'
    };
  } else {
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5
    };
  }
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 20,
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
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 5
        }
    )
  },






  questionText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    lineHeight: 32,
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
  instructionText: {
    color: '#fff',
    fontSize: 17,
    fontStyle: 'italic',
    marginBottom: 24,
    textAlign: 'center',
    padding: 10,
    fontWeight: '500',
  }
});

export default QuestionsScreen;