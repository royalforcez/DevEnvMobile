import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chip, Card } from 'react-native-paper';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';






export default function DreamList() {
    const [dreams, setDreams] = useState([]);

    const fetchData = async () => { //type arrow function
        try {
            const data = await AsyncStorage.getItem('dreamFormDataArray');
            const dreamFormDataArray = data ? JSON.parse(data) : [];
            console.log(dreamFormDataArray)
            setDreams(dreamFormDataArray);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };


    // Ce useEffect est executé une seule fois à l'instanciation du composant
    useEffect(() => {
        //AsyncStorage.clear();
        fetchData();
    }, []);
    // Ce useEffect est executé à chaque fois que 'dreams' change

    useFocusEffect(
        useCallback(() => {
            fetchData();

            return () => {
                console.log('This route is now unfocused.');
            }
        }, [])
    );

    return (

        <View>
            <Text style={styles.title}>Liste des Rêves :</Text>
            {dreams.map((dream, index) => (
                <Card style={styles.card}>
                    <Card.Content>
                        <Text key={index} style={styles.dreamText}>
                            {dream.dreamText}{"\n"}{"\n"}

                            Type de rêve : {dream.isLucidDream ? 'Lucide' : ''} {dream.isNightmare ? 'Cauchemar' : ''} {dream.isPremo ? 'Prémonitoire' : ''}{"\n"}{"\n"}

                            Date du rêve : {dream.newDate} {"\n"}{"\n"}

                            Etat émotionnel : {dream.emotionalFeel} {"\n"}{"\n"}

                            Personnages du rêve : {dream.characters} {"\n"}{"\n"}

                            Lieu du rêve : {dream.place} {"\n"}{"\n"}

                            Hashtags:{"\n"}

                            1. {dream.hashtags[0].id} - <Chip onPress={() => console.log('Pressed')}>#{dream.hashtags[0].label}</Chip> {"\n"}

                            2. {dream.hashtags[1].id} - <Chip onPress={() => console.log('Pressed')}>#{dream.hashtags[1].label}</Chip> {"\n"}

                            3. {dream.hashtags[2].id} - <Chip onPress={() => console.log('Pressed')}>#{dream.hashtags[2].label}</Chip> {"\n"}
                        </Text>
                    </Card.Content>
                </Card>
            ))}
        </View>

    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    dreamText: {
        fontSize: 16,
        marginBottom: 4,
    },
    card: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        marginTop: 25
    }
});