import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';

export default function App() {

  // Pedidos iniciales de ejemplo.
  const [pedidos, setPedidos] = useState([
    {
      id: '1',
      cliente: 'Carlos Pérez',
      producto: 'Hamburguesa Artesanal',
      estado: 'Pendiente'
    },
    {
      id: '2',
      cliente: 'Ana María Gómez',
      producto: 'Pizza Hawaiana',
      estado: 'En Proceso'
    }
  ]);

  // Estados de los campos del formulario.
  const [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');

  // ==========================================
  // REGISTRAR UN PEDIDO
  // ==========================================

  const agregarPedido = () => {

    // Validar que los campos no estén vacíos.
    if (
      cliente.trim() === '' ||
      producto.trim() === ''
    ) {
      Alert.alert(
        'Campos incompletos',
        'Por favor complete todos los campos.'
      );

      return;
    }

    // Crear el nuevo pedido.
    const nuevoPedido = {
      id: Date.now().toString(),
      cliente: cliente.trim(),
      producto: producto.trim(),
      estado: 'Pendiente'
    };

    // Agregarlo al inicio de la lista.
    setPedidos((pedidosActuales) => [
      nuevoPedido,
      ...pedidosActuales
    ]);

    // Limpiar los campos del formulario.
    setCliente('');
    setProducto('');
  };


  // ==========================================
  // CAMBIAR EL ESTADO DE UN PEDIDO
  // ==========================================

  const cambiarEstado = (id) => {

    setPedidos((pedidosActuales) =>
      pedidosActuales.map((item) => {

        // Comprobar si es el pedido seleccionado.
        if (item.id === id) {

          let nuevoEstado;

          if (item.estado === 'Pendiente') {
            nuevoEstado = 'En Proceso';
          } else if (item.estado === 'En Proceso') {
            nuevoEstado = 'Entregado';
          } else {
            nuevoEstado = 'Pendiente';
          }

          // Crear una copia del pedido modificado.
          return {
            ...item,
            estado: nuevoEstado
          };
        }

        // Mantener los demás pedidos sin cambios.
        return item;
      })
    );
  };


  // ==========================================
  // MOSTRAR CADA PEDIDO
  // ==========================================

  const renderizarPedido = ({ item }) => {

    // Elegir el estilo según el estado.
    const estiloEstado =
      item.estado === 'Pendiente'
        ? styles.pending
        : item.estado === 'En Proceso'
          ? styles.process
          : styles.delivered;
    
    return (

      <View style={styles.card}>

        <View style={styles.cardInfo}>

          <Text style={styles.clientText}>
            {item.cliente}
          </Text>

          <Text style={styles.productText}>
            Pedido: {item.producto}
          </Text>

          <Text
            style={[
              styles.statusText,
              estiloEstado
            ]}
          >
            Estado: {item.estado}
          </Text>

        </View>

        <TouchableOpacity
          style={styles.btnAction}
          onPress={() => cambiarEstado(item.id)}
        >
          <Text style={styles.btnActionText}>
            Cambiar
          </Text>
        </TouchableOpacity>

      </View>
    );
  };


  // ==========================================
  // INTERFAZ PRINCIPAL
  // ==========================================

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f8f9fa"
      />

      {/* Encabezado */}

      <View style={styles.header}>

        <Text style={styles.headerTitle}>
          Gestión de Pedidos
        </Text>

        <Text style={styles.headerSubtitle}>
          Móvil I - SENA ADSO
        </Text>

      </View>


      {/* Formulario */}

      <View style={styles.formContainer}>

        <Text style={styles.formTitle}>
          Registrar nuevo pedido
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del cliente"
          placeholderTextColor="#888"
          value={cliente}
          onChangeText={setCliente}
        />

        <TextInput
          style={styles.input}
          placeholder="Descripción del pedido"
          placeholderTextColor="#888"
          value={producto}
          onChangeText={setProducto}
        />

        <TouchableOpacity
          style={styles.btnAgregar}
          onPress={agregarPedido}
        >

          <Text style={styles.btnText}>
            Registrar pedido
          </Text>

        </TouchableOpacity>

      </View>


      {/* Lista de pedidos */}

      <View style={styles.listContainer}>

        <Text style={styles.listTitle}>
          Pedidos registrados ({pedidos.length})
        </Text>

        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id}
          renderItem={renderizarPedido}
          contentContainerStyle={styles.listaContenido}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No hay pedidos registrados.
            </Text>
          }
        />

      </View>

    </SafeAreaView>
  );
}


// ==========================================
// ESTILOS DE LA APLICACIÓN
// ==========================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    paddingHorizontal: 16,
    paddingTop: 20
  },

  header: {
    marginBottom: 20,
    alignItems: 'center'
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center'
  },

  headerSubtitle: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4
  },

  formContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3
  },

  formTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12
  },

  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
    marginBottom: 12,
    fontSize: 16,
    color: '#111827'
  },

  btnAgregar: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },

  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  listContainer: {
    flex: 1
  },

  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#374151'
  },

  listaContenido: {
    paddingBottom: 24
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2
  },

  cardInfo: {
    flex: 1,
    paddingRight: 8
  },

  clientText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827'
  },

  productText: {
    fontSize: 14,
    color: '#4b5563',
    marginVertical: 4
  },

  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4
  },

  pending: {
    color: '#d97706'
  },

  process: {
    color: '#2563eb'
  },

  delivered: {
    color: '#16a34a'
  },

  btnAction: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6
  },

  btnActionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151'
  },

  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 30
  }

});