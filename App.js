// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './LoginScreen';
import FeedScreen from './FeedScreen';
import DetalhesScreen from './DetalhesScreen';

// Cria o navegador em pilha
const Stack = createNativeStackNavigator();

// Temas light/dark (opcional)
const lightTheme = {
  /* ... mantem os mesmos temas anteriores ... */
};

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6200ee',
            },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ title: 'Login' }}
          />
          <Stack.Screen 
            name="Feed" 
            component={FeedScreen} 
            options={{ title: 'Catálogo' }}
          />
          <Stack.Screen 
            name="Detalhes" 
            component={DetalhesScreen} 
            options={{ title: 'Detalhes' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
