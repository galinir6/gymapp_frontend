import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import exercises from "../../assets/data/exercises.json"
import { Stack } from "expo-router";

export default function ExerciseDetailsScreen() {

    const params = useLocalSearchParams()

    const exercise = exercises.find((item) => item.name == params.name)

    if (!exercise) {
        return (
            <Text>
                Exercise not found
            </Text>
        )
    }

    return (

        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{ title: exercise.name }} />
            <View style={styles.panel}>
                <Text style={styles.exersiceName}>{exercise.name}</Text>
                <Text style={styles.exersiceSub}>{exercise.muscle} | {exercise.equipment}</Text>
            </View>
            <View style={styles.panel}>
                <Text style={styles.instructions}>{exercise.instructions}</Text>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
        gap:10,
        backgroundColor: 'ghostwhite',
    },
    exersiceName: {
        fontSize: 20,
        fontWeight: 500,
    },
    exersiceSub: {
        color: 'dimgray'
    },
    instructions: {
        fontSize: 16,
        lineHeight: 20
    },
    panel: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white'
    }
});