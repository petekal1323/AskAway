//screens/QuestionsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import questionDatabase from '../data/questionDatabase';

const QuestionsScreen = ({ route, navigation})=>{
  const { relationship, depth } = route.params;
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);


  // use the imported questionDatabase
  useEffect(() => {
    try{
      const relationshipQuestions = questionDatabase[relationship][depth];
      const shuffledQuestions = [...relationshipQuestions].sort(() => 0.5 - Math.random());

      setQuestions(shuffledQuestions);
    } catch(error) {
      console.error('Error loading questions:', error);
      setQuestions([]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [relationship, depth]);

  const handleSwipeLeft = (cardIndex) => {
    setCurrentCardIndex(cardIndex + 1);
    console.log('Swiped left for Next question:', questions[cardIndex + 1]);
  }

  const handleSwipeRight = () => {
    if (currentCardIndex > 0){
      setCurrentCardIndex(currentCardIndex - 1);
      console.log('Swiped right for Previous question:', questions[currentCardIndex - 1]);
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
              onSwipedRight={handleSwipeRight}
              cardIndex={currentCardIndex}
              backgroundColor={'transparent'}
              stackSize={3}
              stackSeparation={15}
              verticalSwipe={false}
              animateOverlayLabelsOpacity
              animateCardOpacity
              goBackToPreviousCardOnSwipeRight={true}
            />
          ) : (
            <View style={styles.card}>
              <Text style={styles.questionText}>No questions available</Text>
            </View>
          )}
        </View>
        <Text style={styles.instructionText}>
          Swipe left for next question • Swipe right for previous question
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

const { width } = Dimensions.get('window');

const cardShadow = Platform.select({
  web: {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  default: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  swiperContainer: {
    height: 400,
    width: width - 40,
  },
  card: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    ...cardShadow,
  },
  questionText: {
    fontSize: 22,
    color: '#333',
    textAlign: 'center',
    lineHeight: 30,
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
    fontSize: 14,
    marginTop: 20,
    opacity: 0.8,
  }
});
export default QuestionsScreen;