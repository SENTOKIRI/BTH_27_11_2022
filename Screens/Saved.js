import { View, Text, ScrollView, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ExploreState } from '../context/Context';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { v4 as uuidv4 } from 'uuid';
import SingleNews from '../components/SingleNews';

const Saved = ({ navigation }) => {
    const { userId } = ExploreState();
    const [savedNews, setSavedNews] = useState([])
    const value = false;
    useEffect(() => {

        const saveRef = collection(db, 'saved');
        const q = query(saveRef, where("userId", "==", userId))
        const unsub = onSnapshot(q, (querySnapshot) => {
            let tempArray = [];
            querySnapshot.forEach((doc) => {
                tempArray.push({ ...doc.data() });
            });
            setSavedNews([...tempArray]);
        });
        return () => unsub();
    }, [userId]);

    return (
        <ScrollView>
            {
                savedNews.map((heading) => (
                    <SingleNews key={uuidv4()} heading={heading} value={value} />
                ))
            }
        </ScrollView>
    )
}

export default Saved