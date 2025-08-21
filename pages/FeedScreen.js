// FeedScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Chip, Switch, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// Dados fictícios dos produtos
const shirtsData = [
  {
    id: 1,
    name: "Camisa Flamengo 2024",
    price: 299.90,
    image: "https://placehold.co/600x600/red/white?text=FLA",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Vermelho", "Preto"]
  },
  // Adicione mais itens...
];

const FeedScreen = ({ route }) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(route.params?.isDarkMode || false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const renderItem = ({ item }) => (
    <Card 
      style={styles.card}
      onPress={() => navigation.navigate('Detalhes', { shirt: item })}
    >
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>R$ {item.price.toFixed(2)}</Paragraph>
        <View style={styles.chipContainer}>
          <Chip icon="tshirt-crew">{item.sizes[0]}</Chip>
          <Chip icon="palette">{item.colors[0]}</Chip>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Catálogo de Camisas</Text>
        <View style={styles.switchContainer}>
          <Text>Modo Escuro</Text>
          <Switch
            value={isDarkMode}
            onValueChange={() => setIsDarkMode(!isDarkMode)}
          />
        </View>
      </View>

      <FlatList
        data={shirtsData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    marginBottom: 15,
  },
  chipContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  list: {
    paddingBottom: 20,
  },
});

export default FeedScreen;
