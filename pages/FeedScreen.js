import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Platform, Image, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
// Imagens camisas
import atleticomg from '../assets/camisas/atleticomg.jpg';
import corinthians from '../assets/camisas/corinthians.jpg';
import corinthians2 from '../assets/camisas/corinthians2.jpg';
import palmeiras from '../assets/camisas/palmeiras.jpg';
import cruzeiro from '../assets/camisas/cruzeiro.jpg';
import flamengo from '../assets/camisas/flamengo.jpg';
import fluminense from '../assets/camisas/fluminense.jpg';
import internacional from '../assets/camisas/internacional.jpg';
import santos from '../assets/camisas/santos1.jpg';
import saopaulo from '../assets/camisas/saopaulo.jpg';
import vasco from '../assets/camisas/vasco.jpg';

const shirtsData = [
  { id: 1, name: "Camisa Flamengo 2024", price: 299.90, image: flamengo, sizes: ["P", "M", "G", "GG"], colors: ["Vermelho", "Preto"] },
  { id: 2, name: "Camisa Vasco 2024", price: 299.90, image: vasco, sizes: ["P", "M", "G", "GG"], colors: ["Preto", "Branco"] },
  { id: 3, name: "Camisa São Paulo 2024", price: 289.90, image: saopaulo, sizes: ["P", "M", "G", "GG"], colors: ["Branco", "Vermelho", "Preto"] },
  { id: 4, name: "Camisa Corinthians 2024", price: 279.90, image: corinthians, sizes: ["P", "M", "G", "GG"], colors: ["Preto", "Branco"] },
  { id: 5, name: "Camisa Corinthians Yuri Alberto 2024", price: 279.90, image: corinthians2, sizes: ["P", "M", "G", "GG"], colors: ["Preto", "Branco"] },
  { id: 6, name: "Camisa Santos 2024", price: 269.90, image: santos, sizes: ["P", "M", "G", "GG"], colors: ["Branco", "Preto"] },
  { id: 7, name: "Camisa Atlético Mineiro 2024", price: 289.90, image: atleticomg, sizes: ["P", "M", "G", "GG"], colors: ["Preto", "Branco"] },
  { id: 8, name: "Camisa Internacional 2024", price: 289.90, image: internacional, sizes: ["P", "M", "G", "GG"], colors: ["Vermelho", "Branco"] },
  { id: 9, name: "Camisa Palmeiras 2024", price: 299.90, image: palmeiras, sizes: ["P", "M", "G", "GG"], colors: ["Verde", "Branco"] },
  { id: 10, name: "Camisa Fluminense 2024", price: 289.90, image: fluminense, sizes: ["P", "M", "G", "GG"], colors: ["Verde", "Grená", "Branco"] },
  { id: 11, name: "Camisa Botafogo 2024", price: 279.90, image: { uri: "https://botafogo.vtexassets.com/arquivos/ids/165364-1600-auto?v=638890584725870000&width=1600&height=auto&aspect=true" }, sizes: ["P", "M", "G", "GG"], colors: ["Preto", "Branco"] },
  { id: 12, name: "Camisa Cruzeiro 2024", price: 289.90, image: cruzeiro, sizes: ["P", "M", "G", "GG"], colors: ["Azul", "Branco"] },
];

const FeedScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("Todos");
  const [usuario, setUsuario] = useState(null);
  const [likedShirts, setLikedShirts] = useState([]);

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const data = await AsyncStorage.getItem('@usuario');
        if (data !== null) {
          setUsuario(JSON.parse(data));
        }
      } catch (e) {
        console.log('Erro ao carregar usuário:', e);
      }
    };

    const carregarCurtidos = async () => {
      try {
        const curtidos = await AsyncStorage.getItem('@likedShirts');
        if (curtidos !== null) {
          setLikedShirts(JSON.parse(curtidos));
        }
      } catch (e) {
        console.log('Erro ao carregar curtidos:', e);
      }
    };

    carregarUsuario();
    carregarCurtidos();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const Likee = async (shirt) => {
    const isLiked = likedShirts.some(item => item.id === shirt.id);
    let updatedLikes = [];
    if (isLiked) {
      updatedLikes = likedShirts.filter(item => item.id !== shirt.id);
    } else {
      updatedLikes = [...likedShirts, shirt];
    }
    setLikedShirts(updatedLikes);
    try {
      await AsyncStorage.setItem('@likedShirts', JSON.stringify(updatedLikes));
    } catch (e) {
      console.log('Erro ao salvar curtidos:', e);
    }
  };

  const filteredShirts = selectedTeam === "Todos" ? shirtsData : shirtsData.filter(item => item.name.includes(selectedTeam));
const renderItem = ({ item }) => {
  return (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate('Detalhes', {
          shirt: item,
          onLikeUpdated: (newLikedShirts) => setLikedShirts(newLikedShirts),
        })
      }
    >
      <Card.Cover source={item.image} />
      <Card.Content>
        <Title style={styles.cardTitle}>{item.name}</Title>
        <Paragraph style={styles.cardPrice}>R$ {item.price.toFixed(2)}</Paragraph>
      </Card.Content>
    </Card>
  );
};


  return (
    <LinearGradient colors={['#045071', '#ffffff']} style={styles.gradient}>
      <View style={styles.container}>
        {/* Header com usuário */}
        {usuario && (
          <View style={styles.userHeader}>
            <Text style={styles.userName}>{usuario.nickname}</Text>
            <Image source={{ uri: usuario.foto || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={styles.userImage} />
          </View>
        )}

        {/* Botão para ir para tela de curtidos */}
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Curtidos')}
          style={{ marginBottom: 10 }}
        >
          Ver Curtidos
        </Button>

        {/* Picker */}
        {Platform.OS === "ios" ? (
          <Picker selectedValue={selectedTeam} style={styles.pickerIOS} onValueChange={(itemValue) => setSelectedTeam(itemValue)} mode="dropdown" >
            <Picker.Item label="Todos os Times" value="Todos" />
            <Picker.Item label="Flamengo" value="Flamengo" />
            <Picker.Item label="Vasco" value="Vasco" />
            <Picker.Item label="São Paulo" value="São Paulo" />
            <Picker.Item label="Corinthians" value="Corinthians" />
            <Picker.Item label="Santos" value="Santos" />
            <Picker.Item label="Atlético Mineiro" value="Atlético Mineiro" />
            <Picker.Item label="Internacional" value="Internacional" />
            <Picker.Item label="Palmeiras" value="Palmeiras" />
            <Picker.Item label="Fluminense" value="Fluminense" />
            <Picker.Item label="Botafogo" value="Botafogo" />
            <Picker.Item label="Cruzeiro" value="Cruzeiro" />
          </Picker>
        ) : (
          <View style={styles.pickerAndroidWrapper}>
            <Picker selectedValue={selectedTeam} style={styles.pickerAndroid} onValueChange={(itemValue) => setSelectedTeam(itemValue)} mode="dialog" dropdownIconColor="black" >
              <Picker.Item label="Todos os Times" value="Todos" />
              <Picker.Item label="Flamengo" value="Flamengo" />
              <Picker.Item label="Vasco" value="Vasco" />
              <Picker.Item label="São Paulo" value="São Paulo" />
              <Picker.Item label="Corinthians" value="Corinthians" />
              <Picker.Item label="Santos" value="Santos" />
              <Picker.Item label="Atlético Mineiro" value="Atlético Mineiro" />
              <Picker.Item label="Internacional" value="Internacional" />
              <Picker.Item label="Palmeiras" value="Palmeiras" />
              <Picker.Item label="Fluminense" value="Fluminense" />
              <Picker.Item label="Botafogo" value="Botafogo" />
              <Picker.Item label="Cruzeiro" value="Cruzeiro" />
            </Picker>
          </View>
        )}

        {/* Lista */}
        <FlatList
          data={filteredShirts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#bb86fc']} />
          }
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 15 },
  userHeader: {
    position: 'absolute',
    top: 40,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  userName: { color: 'white', fontWeight: 'bold', marginRight: 10, fontSize: 16 },
  userImage: { width: 45, height: 45, borderRadius: 22.5, borderWidth: 2, borderColor: '#fff' },
  pickerIOS: { marginTop: 30, color: 'black', height: 50, marginBottom: 150 },
  pickerAndroidWrapper: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginTop: 80, marginBottom: 20, overflow: 'hidden' },
  pickerAndroid: { color: 'black', height: 50, width: '100%' },
  card: { marginBottom: 15, borderRadius: 15, elevation: 5, backgroundColor: 'rgba(255, 255, 255, 0.9)', position: 'relative' },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardPrice: { fontSize: 14, color: '#6200ee', marginVertical: 5 },
  list: { paddingBottom: 20 },

});

export default FeedScreen;
