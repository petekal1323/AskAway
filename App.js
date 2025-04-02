// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import RelationshipScreen from './screens/RelationshipScreen';
import DepthScreen from './screens/DepthScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Relationship"
          component={RelationshipScreen}
          options={{
            title: 'Select Relationship Type',
            headerTransparent: true,
            headerTitleStyle: { color: '#fff' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Depth"
          component={DepthScreen}
          options={{
            headerTransparent: true,
            headerTitleStyle: { color: '#fff' },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

