import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Image
} from "react-native";
import {
  Card,
  Button,
  Chip,
  Text,
  Title,
  Paragraph,
  TextInput,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const DetalhesScreen = ({ route, navigation }) => {
  const { shirt } = route.params;

  // Estados do modal
  const [visivel, setVisivel] = useState(false);
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
 const [usuario, setUsuario] = useState(null);

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
    carregarUsuario();
  }, []);
  return (
    <LinearGradient colors={["#ffffff", "#045071"]} style={styles.gradient}>
     {/* Header com usuário */}
        {usuario && (
          <View style={styles.userHeader}>
            <Text style={styles.userName}>{usuario.nickname}</Text>
            <Image
              source={{ uri: usuario.foto || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
              style={styles.userImage}
            />
          </View>
        )}
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Cover source={shirt.image} style={styles.cardImage} />
          <Card.Content style={styles.content}>
            <Title style={styles.cardTitle}>{shirt.name}</Title>
            <Paragraph style={styles.cardDescription}>
              {shirt.description || "Camisa oficial do time"}
            </Paragraph>

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
            <Button
              mode="contained"
              onPress={() => setVisivel(true)}
              style={styles.button}
            >
              Comprar
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.button}
            >
              Voltar
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>

      {/* Modal de Endereço */}
      {visivel && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Endereço de Entrega</Text>

            <TextInput
              placeholder="Rua"
              style={styles.input}
              value={rua}
              onChangeText={setRua}
            />
            <TextInput
              placeholder="Bairro"
              style={styles.input}
              value={bairro}
              onChangeText={setBairro}
            />
            <TextInput
              placeholder="Número da Casa"
              keyboardType="numeric"
              style={styles.input}
              value={numero}
              onChangeText={setNumero}
            />

            <Button
              onPress={() => {
                if (!rua || !bairro || !numero) {
                  Alert.alert("Erro", "Por favor, preencha todos os campos.");
                  return;
                }
                Alert.alert("Sucesso", "Item adicionado ao carrinho");
                setRua("");
                setBairro("");
                setNumero("");
                setVisivel(false);
              }}
              style={styles.finalizeButton}
              mode="contained"
            >
              Finalizar Pedido
            </Button>

            <Button
              onPress={() => setVisivel(false)}
              style={styles.cancelButton}
              mode="outlined"
            >
              Cancelar
            </Button>
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  card: {
    borderRadius: 15,
    elevation: 5,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    marginTop:130,
  },
  cardImage: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  content: {
    padding: 15,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#212121",
  },
  cardDescription: {
    marginVertical: 10,
    color: "#555555",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6200ee",
    marginVertical: 10,
  },
  sectionTitle: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "600",
    color: "#212121",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  chip: {
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 10,
  },
  actions: {
    justifyContent: "space-around",
    padding: 10,
  },
  button: {
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  // Modal
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 10,
  },
  finalizeButton: {
    marginTop: 10,
  },
  cancelButton: {
    marginTop: 10,
  },
    userHeader: {
    position: 'absolute',
    top: 40,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  userName: {
    color: '#045071',
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 16,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default DetalhesScreen;
