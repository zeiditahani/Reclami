import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Vérification des rôles en fonction de l'email et du mot de passe
    if (email === 'admin@google.com' && password === '123') {
      // Redirection pour l'administrateur
      Alert.alert('Bienvenue Admin !', 'Vous êtes connecté en tant qu’administrateur.');
      navigation.replace('Admin'); // Remplace l'écran actuel par la navigation admin
    } else if (email === 'user@google.com' && password === '123') {
      // Redirection pour l'utilisateur classique
      Alert.alert('Bienvenue Utilisateur !', 'Vous êtes connecté en tant qu’utilisateur.');
      navigation.replace('Dashboard'); // Remplace l'écran actuel par la navigation utilisateur
    } else {
      // Si les identifiants sont incorrects
      Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('signUp')}
      >
        <Text style={styles.signUpText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default Login;
