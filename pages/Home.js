// IntroScreen.js
import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const IntroScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      {/* Conteúdo por cima */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://placehold.co/150x150/045071/FFFFFF?text=⚽' }}
          style={styles.logo}
        />
        <Text style={styles.title} variant="headlineLarge">
          Time de Craques
        </Text>
        <Text style={styles.subtitle} variant="bodyLarge">
          Sua loja oficial de camisetas
        </Text>
      </View>

      <View style={styles.actions}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={[styles.button, styles.buttonElevated]}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Entrar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#045071', padding: 20 },
  header: { alignItems: 'center', marginBottom: 60 },
  logo: { width: 150, height: 150, borderRadius: 75, marginBottom: 16, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 3, borderColor: 'rgba(255, 255, 255, 0.2)' },
  title: { color: '#ffffff', fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center' },
  actions: { width: '100%', paddingHorizontal: 20 },
  button: { borderRadius: 12, marginTop: 10 },
  buttonContent: { height: 50 },
  buttonLabel: { fontSize: 16, fontWeight: '600' },
});

export default IntroScreen;
