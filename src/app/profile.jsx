import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useAuth } from '../providers/AuthContext';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const { accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        console.log('Token:', accessToken);

        if (!accessToken) {
          console.error('Access token not found');
          router.push('/login');
          return;
        }

        // Fetch user details
        const userResponse = await axios.get('http://10.100.102.35:5000/api/auth/user', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setUser(userResponse.data);

        // Fetch workout history
        const workoutResponse = await axios.get('http://10.100.102.35:5000/api/workouts/history', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setWorkoutHistory(workoutResponse.data);
      } catch (error) {
        console.error('Fetch user details or workout history error:', error);
      }
    };

    getUserDetails();
  }, [accessToken]);

  const handleLogout = () => {
    router.push('/login');
  };

  const renderWorkoutItem = ({ item }) => (
    <View style={styles.workoutItem}>
      <Text style={styles.workoutText}><Text style={styles.bold}>Name:</Text> {item.name}</Text>
      <Text style={styles.workoutText}><Text style={styles.bold}>Details:</Text> {item.details}</Text>
      <Text style={styles.workoutText}><Text style={styles.bold}>Location:</Text> {item.location || 'Unknown location'}</Text>
      <Text style={styles.workoutText}><Text style={styles.bold}>Date:</Text> {new Date(item.date).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user && (
        <View style={styles.userDetails}>
          <Text style={styles.userDetail}>Name: {user.name}</Text>
          <Text style={styles.userDetail}>Email: {user.email}</Text>
        </View>
      )}
      <Text style={styles.subtitle}>Workout History:</Text>
      <FlatList
        data={workoutHistory}
        keyExtractor={(item) => item._id}
        renderItem={renderWorkoutItem}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'ghostwhite',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  userDetails: {
    marginBottom: 20,
  },
  userDetail: {
    fontSize: 18,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  workoutItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  workoutText: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
});
