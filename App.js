
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CryptoScreen from './screens/CryptoScreen';
import QuoteScreen from './screens/QuoteScreen';
import WeatherScreen from './screens/WeatherScreen';
import CalculatorScreen from './screens/CalculatorScreen';

export default function App() {
  const stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <stack.Navigator initialRouteName="Home">
      <stack.Screen
      name="Crypto"
      component={CryptoScreen}
      options={{
        title: 'Crypto',
        headerTitle: 'Crypto',
        headerTitleAlign: 'center',
        headerTintColor: '#0000ff',
      }}
      />
      <stack.Screen
      name="Quotes"
      component={QuoteScreen}
      options={{
        title: 'Quotes',
        hedertitle: 'Quotes',
        headerTitleAlign: 'center',
        headerTintColor: '#0000ff',
      }}
      />

      <stack.Screen
      name="Weather"
      component={WeatherScreen}
      options={{
        title: 'Weather',
        hedertitle: 'Weather',
        headerTitleAlign: 'center',
        headerTintColor: '#0000ff',
      }}
      />

<stack.Screen
      name="Calculator"
      component={CalculatorScreen}
      options={{
        title: 'Calculator',
        headerTitle: 'Calculator',
        headerTitleAlign: 'center',
        headerTintColor: '#0000ff',
      }}
      />
    </stack.Navigator>
    </NavigationContainer>
  );
}


