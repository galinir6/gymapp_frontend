import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, Pressable, Modal, TextInput } from 'react-native';
import exercises from "../../assets/data/exercises.json";
import ExerciseListItem from '../components/ExerciseListItem';
import { Link } from 'expo-router';
import * as FileSystem from 'expo-file-system';


export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openMenu = () => {
    setModalVisible(true);
  };

  const closeMenu = () => {
    setModalVisible(false);
  };

  const filteredExercises = exercises.filter(exercise => 
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exercise.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exercise.muscle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Examples</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search exercises..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredExercises}
        contentContainerStyle={{ gap: 5 }}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
      />

      <Button title="Open Menu" onPress={openMenu} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeMenu}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Menu</Text>
            <Link href="/login" asChild>
              <Pressable style={styles.menuButton} onPress={closeMenu}>
                <Text style={styles.menuButtonText}>Login</Text>
              </Pressable>
            </Link>
            <Link href="/register" asChild>
              <Pressable style={styles.menuButton} onPress={closeMenu}>
                <Text style={styles.menuButtonText}>Register</Text>
              </Pressable>
            </Link>
            <Link href="/addworkout" asChild>
              <Pressable style={styles.menuButton} onPress={closeMenu}>
                <Text style={styles.menuButtonText}>Add Workout</Text>
              </Pressable>
            </Link>
            <Link href="/progress" asChild>
              <Pressable style={styles.menuButton} onPress={closeMenu}>
                <Text style={styles.menuButtonText}>Progress</Text>
              </Pressable>
            </Link>
            <Link href="/profile" asChild>
              <Pressable style={styles.menuButton} onPress={closeMenu}>
                <Text style={styles.menuButtonText}>Profile</Text>
              </Pressable>
            </Link>
            <Button title="Close Menu" onPress={closeMenu} />
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  menuButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
