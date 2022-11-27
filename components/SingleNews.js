import { View, Text, Image, useWindowDimensions, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { ExploreState } from '../context/Context';
import { db } from '../firebase/firebase-config';
import { v4 as uuidv4 } from 'uuid';

const SingleNews = ({ heading, value }) => {
    const layout = useWindowDimensions();
    const [save, setSave] = useState(true)
    const { userId } = ExploreState();
    const [userData, setUserData] = useState([])

    useEffect(() => {

        const userRef = collection(db, 'users');
        const q = query(userRef, where("uid", "==", userId))
        const unsub = onSnapshot(q, (querySnapshot) => {
            let tempArray = [];
            querySnapshot.forEach((doc) => {
                tempArray.push({ ...doc.data() });
            });
            setUserData([...tempArray]);
        });
        return () => unsub();
    }, [userId]);

    const add = async (title, description, author, urlToImage) => {
        if (!userId) {
            alert('SignIn To Save News')
            return;
        }
        if (userData[0].saves.includes(title)) {
            setSave(false)
            return;
        }
        const savedId = uuidv4()
        await setDoc(doc(db, "saved", savedId), {
            userId,
            savedId,
            title,
            author,
            urlToImage,
            description
        })

        await updateDoc(doc(db, "users", userId), {
            saves: arrayUnion(title)
        })

        setSave(false)
    }

    const remove = async (id, title) => {
        await deleteDoc(doc(db, "saved", id))
        await updateDoc(doc(db, "users", userId), {
            saves: arrayRemove(title)
        })
    }

    return (
        <View style={{ marginTop: 1, marginBottom: 1, width: '100%', height: layout.height, justifyContent: 'center' }}>
            <View style={{ margin: 6, height: '50%', justifyContent: 'center' }}>
                <Image style={{ width: '100%', height: '100%', borderRadius: 10 }}
                    source={{
                        uri: heading.urlToImage
                    }} />
            </View>
            <View style={{ margin: 6, justifyContent: 'space-evenly' }}>
                <Text style={{ margin: 6, fontSize: 20, fontWeight: '500' }}>{heading.title}</Text>
                <Text style={{ margin: 6, fontSize: 10 }}>Author: {heading.author}</Text>
                <Text style={{ margin: 6, fontSize: 17 }}>
                    {heading.description}
                </Text>
                {
                    save && value ?
                        <Button
                            title='Save'
                            onPress={() => add(heading.title, heading.description, heading.author, heading.urlToImage)}
                        /> : null
                }
                {
                    !value ?
                        <Button
                            title='Remove'
                            onPress={() => remove(heading.savedId, heading.title)}
                        /> : null
                }
            </View>


        </View>
    )
}

export default SingleNews