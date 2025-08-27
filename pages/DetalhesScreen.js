
import React from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Card, Button, Title, Paragraph, Chip, Text } from 'react-native-paper';

// Recebe "route" (parâmetros da navegação) e "navigation" (controle de rotas)
const DetalhesScreen = ({ route, navigation }) => {
  // Extrai o objeto "shirt" enviado pela navegação
  const { shirt } = route.params;

  // Função chamada ao clicar no botão "Comprar"
  const handleComprar = () => {
    // Exibe um alerta confirmando a compra
    Alert.alert('Sucesso', 'Item adicionado ao carrinho');
    // Volta para a tela anterior
    navigation.goBack();
  };

  // Renderização da tela
  return (
    <ScrollView style={styles.container}>
      {/* Card do react-native-paper que agrupa o conteúdo */}
      <Card>
        {/* Exibe a imagem da camisa */}
        <Card.Cover source={{ uri: shirt.image }} />

        {/* Conteúdo principal dentro do card */}
        <Card.Content style={styles.content}>
          {/* Nome da camisa */}
          <Title>{shirt.name}</Title>

          {/* Descrição da camisa (ou mensagem padrão se não houver descrição) */}
          <Paragraph>{shirt.description || 'Camisa oficial do time'}</Paragraph>
          
          {/* Preço */}
          <Text variant="titleMedium" style={styles.price}>
            R$ {shirt.price.toFixed(2)}
          </Text>

          {/* Seção: tamanhos disponíveis */}
          <Text variant="titleSmall" style={styles.sectionTitle}>
            Tamanhos Disponíveis:
          </Text>
          <View style={styles.chipContainer}>
            {/* Cria um chip para cada tamanho da camisa */}
            {shirt.sizes.map((size, i) => (
              <Chip key={i} icon="tshirt-crew" style={styles.chip}>
                {size}
              </Chip>
            ))}
          </View>

          {/* Seção: cores disponíveis */}
          <Text variant="titleSmall" style={styles.sectionTitle}>
            Cores Disponíveis:
          </Text>
          <View style={styles.chipContainer}>
            {/* Cria um chip para cada cor da camisa */}
            {shirt.colors.map((color, i) => (
              <Chip key={i} icon="palette" style={styles.chip}>
                {color}
              </Chip>
            ))}
          </View>
        </Card.Content>
        
        {/* Área dos botões (ações do card) */}
        <Card.Actions style={styles.actions}>
          {/* Botão para comprar (chama a função handleComprar) */}
          <Button mode="contained" onPress={handleComprar}>
            Comprar
          </Button>
          {/* Botão para voltar à tela anterior */}
          <Button mode="outlined" onPress={() => navigation.goBack()}>
            Voltar
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

// Estilos usados no componente
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
