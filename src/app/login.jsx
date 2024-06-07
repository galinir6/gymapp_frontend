import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useAuth } from '../providers/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { saveToken } = useAuth();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError('Email and password are required');
        return;
      }

      const response = await axios.post('http://10.100.102.35:5000/api/auth/login', { email, password });
      const { access_token } = response.data;  // Retrieve access token
      console.log('Token:', access_token);

      // Save the access token using context
      saveToken(access_token);

      // Navigate to ProfileScreen
      router.push('/profile');
    } catch (error) {
      console.error('Login error:', error.response);
      setError('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'ghostwhite',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
