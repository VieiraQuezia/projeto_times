// LoginScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert, Keyboard, ScrollView } from 'react-native';
import { Button, TextInput, Text, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    setLoading(true);
    Keyboard.dismiss();

    setTimeout(() => {
      if (!username.trim()) {
        Alert.alert('Erro', 'Por favor, preencha o usuário');
        setLoading(false);
        return;
      }
      
      if (username === 'aluno' && password === '123') {
        navigation.navigate('Feed', { isDarkMode });
      } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.switchContainer}>
        <Text>Modo Escuro</Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(!isDarkMode)}
        />
      </View>

      <TextInput
        label="Usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        mode="outlined"
      />
      
      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Entrar
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

export default LoginScreen;
