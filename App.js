// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './pages/LoginScreen';
import FeedScreen from './pages/FeedScreen';
import DetalhesScreen from './pages/DetalhesScreen';

// Cria o navegador em pilha
const Stack = createNativeStackNavigator();



const App = () => {
  return (
    
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Feed"
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
  );
};

export default App;
