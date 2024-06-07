import { StyleSheet, Text, View , Pressable} from 'react-native';
import { Link } from 'expo-router';

export default function ExerciseListItem({ item }) {

    return (

        <Link href={`/${item.name}`} asChild>
            <Pressable style={styles.exerciseContainer}>
                <Text style={styles.exersiceName}>{item.name}</Text>
                <Text style={styles.exersiceSub}>{item.muscle} | {item.equipment}</Text>
            </Pressable>
        </Link>
    )
}


const styles = StyleSheet.create({

    exerciseContainer: {
        backgroundColor: '#fff',
        padding: 10,
        gap: 5,
        borderRadius: 10,
    },
    exersiceName: {
        fontSize: 20,
        fontWeight: 500,
    },
    exersiceSub: {
        color: 'dimgray'
    }
});