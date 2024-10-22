import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
                <Text key={index} style={styles.dreamText}>
                    {dream.dreamText} - {dream.isLucidDream ? 'Lucide' : ''} - {dream.isNightmare ? 'Cauchemar' : ''} - {dream.isPremo ? 'Prémonitoire' : ''} - {dream.newDate}
                    <br />
                    Hashtags:
                    <br />
                    1. {dream.hashtags[0].id} - {dream.hashtags[0].label}
                    <br />
                    2. {dream.hashtags[1].id} - {dream.hashtags[1].label}
                    <br />
                    3. {dream.hashtags[2].id} - {dream.hashtags[2].label}
                </Text>
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
});