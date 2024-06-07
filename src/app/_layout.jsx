import { Stack, Tabs } from "expo-router";
import { AuthProvider } from "../providers/AuthContext";


export default function RootLayout() {

    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen name="index" options={{ title: "Exercises" }} />
                <Stack.Screen name="login" options={{ title: "Login" }} />
                <Stack.Screen name="register" options={{ title: "Register" }} />
                <Stack.Screen name="addworkout" options={{ title: "Add Workout" }} />
                <Stack.Screen name="profile" options={{ title: "Profile" }} />
                <Stack.Screen name="progress" options={{title: "progress"}} />
            </Stack>
        </AuthProvider>

    )
}