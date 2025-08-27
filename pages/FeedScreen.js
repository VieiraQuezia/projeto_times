import React, { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Platform } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker'; 

//imagens camisas
import atleticomg from '../assets/camisas/atleticomg.jpg'
import corinthians from '../assets/camisas/corinthians.jpg'
import corinthians2 from '../assets/camisas/corinthians2.jpg'
import palmeiras from '../assets/camisas/palmeiras.jpg'
import cruzeiro from '../assets/camisas/cruzeiro.jpg'
import flamengo from '../assets/camisas/flamengo.jpg'
import fluminense from '../assets/camisas/fluminense.jpg'
import internacional from '../assets/camisas/internacional.jpg'
import santos from '../assets/camisas/santos1.jpg'
import saopaulo from '../assets/camisas/saopaulo.jpg'
import vasco from '../assets/camisas/vasco.jpg'

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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const filteredShirts = selectedTeam === "Todos"
    ? shirtsData
    : shirtsData.filter(item => item.name.includes(selectedTeam));

  const renderItem = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('Detalhes', { shirt: item })}
    >
      <Card.Cover source={item.image} />

      <Card.Content>
        <Title style={styles.cardTitle}>{item.name}</Title>
        <Paragraph style={styles.cardPrice}>R$ {item.price.toFixed(2)}</Paragraph>
      </Card.Content>
      
    </Card>
  );

  return (
    <LinearGradient colors={['#045071', '#ffffff']} style={styles.gradient}>
      <View style={styles.container}>

        {Platform.OS === "ios" ? (
          <Picker
            selectedValue={selectedTeam}
            style={styles.pickerIOS}
            onValueChange={(itemValue) => setSelectedTeam(itemValue)}
            mode="dropdown" // iOS aceita esse estilo
          >
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
            <Picker
              selectedValue={selectedTeam}
              style={styles.pickerAndroid}
              onValueChange={(itemValue) => setSelectedTeam(itemValue)}
              dropdownIconColor="black"
            >
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

        <FlatList
          data={filteredShirts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#bb86fc']}
            />
          }
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 15 },
  pickerIOS: {
    marginTop: -50,
    color: 'black',
    height: 50,
    marginBottom: 150,
  },
  pickerAndroidWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  pickerAndroid: {
    color: 'black',
    height: 50,
    width: '100%',
  },
  card: {
    marginBottom: 15,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardPrice: { fontSize: 14, color: '#6200ee', marginVertical: 5 },
  list: { paddingBottom: 20 },
});

export default FeedScreen;
