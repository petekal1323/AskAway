// screens/QuestionsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const QuestionsScreen = ({ route, navigation }) => {
  const { relationship, depth } = route.params;


  const questions = [
    "What is your favorite way to relax?",
    "If you could travel anywhere right now, where would you go?",
    "What hobby have you always wanted to try?",
    "What is one goal you have for the coming year?",
    "What does a perfect day look like for you?",
  ];

  const onSwipedLeft = (cardIndex) => {
    console.log("Swiped left on:", questions[cardIndex]);
  };

  const onSwipedRight = (cardIndex) => {
    console.log("Swiped right on:", questions[cardIndex]);
  };

  return (
    <LinearGradient colors={['#8E2DE2', '#4A00E0']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>
          {relationship} - {depth}
        </Text>
        <View style={styles.swiperContainer}>
          <Swiper
            cards={questions}
            renderCard={(card) => {
              return (
                <View style={styles.card}>
                  <Text style={styles.questionText}>{card}</Text>
                </View>
              );
            }}
            onSwipedLeft={onSwipedLeft}
            onSwipedRight={onSwipedRight}
            cardIndex={0}
            backgroundColor={'transparent'}
            stackSize={3}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const { width } = Dimensions.get('window');

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
    boxShadowColor: '#000',
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.2,
    boxShadowRadius: 4,
    elevation: 5,
  },
  questionText: {
    fontSize: 22,
    color: '#333',
    textAlign: 'center',
  },
});

export default QuestionsScreen;
