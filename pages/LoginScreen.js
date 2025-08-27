// LoginScreen.js
import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Alert, 
  Keyboard, 
  ScrollView, 
  Image, 
  Dimensions, 
  Platform, 
  KeyboardAvoidingView 
} from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [nickname, setnickname] = useState('');
  const [password, setPassword] = useState(''); 
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim() || !nickname.trim()) {
      Alert.alert('Erro', 'Preencha usuário e senha');
      return;
    }

    setLoading(true);

    try {
      await AsyncStorage.setItem('@usuario', JSON.stringify({ username, password, nickname }));
      Alert.alert('Login realizado', `Bem-vindo, ${nickname}!`);
      navigation.navigate('Feed');
    } catch (e) {
      console.log('Erro ao salvar usuário:', e);
      Alert.alert('Erro', 'Não foi possível salvar os dados do usuário');
    } finally {
      setLoading(false);
      Keyboard.dismiss();
    }
  };

  return (
    <KeyboardAvoidingView   
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://placehold.co/120x120/667eea/white?text=⚽' }}
            style={styles.logo}
          />
          <Text style={styles.title} variant="headlineMedium">
            Time de Craques
          </Text>
          <Text style={styles.subtitle} variant="bodyMedium">
            Sua loja oficial de camisetas
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle} variant="headlineSmall">
            Acesse sua conta
          </Text>
          
          <TextInput
            label="Name"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            mode="flat"
            left={<TextInput.Icon icon="account"/>}
          />
          <TextInput
            label="Nick Name"
            value={nickname}
            onChangeText={setnickname}
            style={styles.input}
            mode="flat"
            left={<TextInput.Icon icon="account"/>}
          />
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            mode="flat"
            left={<TextInput.Icon icon="lock" />}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={[styles.button, styles.buttonElevated]}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </View>

        <View style={styles.decoration}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView> 
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', padding: 20, minHeight: height, backgroundColor: '#045071' },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { width: 120, height: 120, borderRadius: 60, marginBottom: 16, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 3, borderColor: 'rgba(255, 255, 255, 0.2)' },
  title: { color: '#ffffff', fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center' },
  card: { backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: 20, padding: 25, marginBottom: 30 },
  cardTitle: { textAlign: 'center', marginBottom: 25, color: '#2d3748', fontWeight: '600' },
  input: { marginBottom: 20, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 12, overflow: 'hidden' },
  button: { borderRadius: 12, marginTop: 10, marginBottom: 20 },
  buttonContent: { height: 50 },
  buttonLabel: { fontSize: 16, fontWeight: '600' },
  decoration: { position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' },
  circle: { position: 'absolute', borderRadius: 100, backgroundColor: 'rgba(255, 255, 255, 0.1)' },
  circle1: { width: 200, height: 200, top: -50, right: -50 },
  circle2: { width: 150, height: 150, bottom: 100, left: -30 },
  circle3: { width: 100, height: 100, bottom: -20, right: 40 },
});

export default LoginScreen;
