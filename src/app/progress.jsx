import React, { useState, useEffect } from 'react';
import {
    Button,
    Image,
    View,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    Text,
    FlatList,
    Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../providers/AuthContext';
import { format } from 'date-fns';

const imgDir = FileSystem.documentDirectory + 'images/';

const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
};

const ProgressScreen = () => {
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState([]);
    const { user } = useAuth();
    const userName = user?.name;

    // Load images on startup
    useEffect(() => {
        requestPermissions();
        loadImages();
    }, []);

    // Load images from file system
    const loadImages = async () => {
        await ensureDirExists();
        const files = await FileSystem.readDirectoryAsync(imgDir);
        const userImages = files
            .filter(file => file.startsWith(userName))
            .map(file => ({
                uri: imgDir + file,
                date: new Date(parseInt(file.split('_')[1], 10)),
            }));
        setImages(userImages);
    };

    // Request permissions
    const requestPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    // Select image from library or camera
    const selectImage = async (useLibrary) => {
        let result;
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.75
        };

        if (useLibrary) {
            result = await ImagePicker.launchImageLibraryAsync(options);
        } else {
            await ImagePicker.requestCameraPermissionsAsync();
            result = await ImagePicker.launchCameraAsync(options);
        }

        // Save image if not cancelled
        if (!result.canceled) {
            saveImage(result.assets[0].uri);
        }
    };

    // Save image to file system
    const saveImage = async (uri) => {
        await ensureDirExists();
        const filename = `${userName}_${Date.now()}.jpeg`;
        const dest = imgDir + filename;
        await FileSystem.copyAsync({ from: uri, to: dest });
        setImages([...images, { uri: dest, date: new Date() }]);
    };

    // Upload image to server
    const uploadImage = async (uri) => {
        setUploading(true);

        await FileSystem.uploadAsync('http://192.168.1.52:8888/upload.php', uri, {
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file'
        });

        setUploading(false);
    };

    // Delete image from file system
    const deleteImage = async (uri) => {
        await FileSystem.deleteAsync(uri);
        setImages(images.filter((i) => i.uri !== uri));
    };

    // Render image list item
    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', margin: 1, alignItems: 'center', gap: 5 }}>
            <Image style={{ width: 200, height: 200 }} source={{ uri: item.uri }} />
            <Text style={{ flex: 1 }}>{format(item.date, 'dd/MM/yyyy')}</Text>
            <Ionicons.Button name="cloud-upload" onPress={() => uploadImage(item.uri)} />
            <Ionicons.Button name="trash" onPress={() => deleteImage(item.uri)} />
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, gap: 20 , backgroundColor: 'ghostwhite'}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 }}>
                <Button title="Photo Library" onPress={() => selectImage(true)} />
                <Button title="Capture Image" onPress={() => selectImage(false)} />
            </View>

            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500' }}>My Images</Text>
            <FlatList data={images} renderItem={renderItem} keyExtractor={(item) => item.uri} />

            {uploading && (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    ]}
                >
                    <ActivityIndicator color="#fff" animating size="large" />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'ghostwhite',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    imageContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
});

export default ProgressScreen;
