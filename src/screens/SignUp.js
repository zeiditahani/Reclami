import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

 const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (username === '' || email === '' || password === '') {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
    } else {
      Alert.alert('Succès', 'Inscription réussie.');
      // Logique d'inscription ici
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={username}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
    
      />
      
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        secureTextEntry={true}
      />
      <Button title="S'inscrire" onPress={handleSignUp} />
      <Button title="go to Login" onPress={()=>{
          navigation.navigate("Login");
        }}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});

export default SignUp;
