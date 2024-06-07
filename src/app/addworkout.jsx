import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useAuth } from '../providers/AuthContext';
import * as Location from 'expo-location';

const OPENCAGE_API_KEY = 'ae26792f3bc44289b274cce9072fc68a';

export default function AddWorkoutScreen() {
    const [workoutName, setWorkoutName] = useState('');
    const [details, setDetails] = useState('');
    const { accessToken } = useAuth();
    const router = useRouter();

    const handleAddWorkout = async () => {
        try {
            console.log('Token:', accessToken);

            if (!accessToken) {
                console.error('Access token not found');
                router.push('/login');
                return;
            }

            let location = await getLocation();
            if (!location) {
                Alert.alert('Location Error', 'Unable to fetch location');
                return;
            }

            const placeName = await reverseGeocode(location.coords.latitude, location.coords.longitude);

            await axios.post('http://10.100.102.35:5000/api/workouts/add', 
                { 
                    name: workoutName, 
                    details,
                    location: placeName,
                    coordinates: {
                        latitude: location.coords.latitude, 
                        longitude: location.coords.longitude 
                    }
                },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            console.log('Workout added successfully');
            router.push('/profile');
        } catch (error) {
            console.error('Add workout error:', error);
        }
    };

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Permission to access location was denied');
            return null;
        }

        let location = await Location.getCurrentPositionAsync({});
        return location;
    };

    const reverseGeocode = async (latitude, longitude) => {
        try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`);
            if (response.data.results.length > 0) {
                return response.data.results[0].formatted;
            } else {
                return 'Unknown location';
            }
        } catch (error) {
            console.error('Reverse geocoding error:', error);
            return 'Unknown location';
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Workout</Text>
            <TextInput
                style={styles.input}
                placeholder="Workout Name"
                value={workoutName}
                onChangeText={setWorkoutName}
            />
            <TextInput
                style={styles.input}
                placeholder="Details"
                value={details}
                onChangeText={setDetails}
            />
            <Button title="Add Workout" onPress={handleAddWorkout} />
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
});
