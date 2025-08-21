// DetalhesScreen.js
import React from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Card, Button, Title, Paragraph, Chip, Text } from 'react-native-paper';

const DetalhesScreen = ({ route, navigation }) => {
  const { shirt } = route.params;

  const handleComprar = () => {
    Alert.alert('Sucesso', 'Item adicionado ao carrinho');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: shirt.image }} />
        <Card.Content style={styles.content}>
          <Title>{shirt.name}</Title>
          <Paragraph>{shirt.description || 'Camisa oficial do time'}</Paragraph>
          
          <Text variant="titleMedium" style={styles.price}>
            R$ {shirt.price.toFixed(2)}
          </Text>

          <Text variant="titleSmall" style={styles.sectionTitle}>
            Tamanhos Disponíveis:
          </Text>
          <View style={styles.chipContainer}>
            {shirt.sizes.map((size, i) => (
              <Chip key={i} icon="tshirt-crew" style={styles.chip}>
                {size}
              </Chip>
            ))}
          </View>

          <Text variant="titleSmall" style={styles.sectionTitle}>
            Cores Disponíveis:
          </Text>
          <View style={styles.chipContainer}>
            {shirt.colors.map((color, i) => (
              <Chip key={i} icon="palette" style={styles.chip}>
                {color}
              </Chip>
            ))}
          </View>
        </Card.Content>
        
        <Card.Actions style={styles.actions}>
          <Button mode="contained" onPress={handleComprar}>
            Comprar
          </Button>
          <Button mode="outlined" onPress={() => navigation.goBack()}>
            Voltar
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  content: {
    padding: 15,
  },
  price: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginTop: 15,
    marginBottom: 5,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  chip: {
    marginRight: 5,
    marginBottom: 5,
  },
  actions: {
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default DetalhesScreen;
