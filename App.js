// App.js
global.PropTypes = require('prop-types');

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import WelcomeScreen from './screens/WelcomeScreen';
import RelationshipScreen from './screens/RelationshipScreen';
import DepthScreen from './screens/DepthScreen';
import QuestionsScreen from './screens/QuestionsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Relationship" component={RelationshipScreen} />
          <Stack.Screen name="Depth" component={DepthScreen} />
          <Stack.Screen name="Questions" component={QuestionsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
