import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { authentication, db } from '../firebase/firebase-config'
import { v4 as uuidv4 } from 'uuid';
import { ExploreState } from '../context/Context'

const Signup = ({ navigation }) => {
    const { setUserId } = ExploreState();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const RegisterUser = async () => {
        const uid = uuidv4()
        setUserId(uid)
        await createUserWithEmailAndPassword(authentication, email, password);
        await setDoc(doc(db, "users", uid), {
            uid,
            name,
            email,
            password,
            saves: [],
        })
        navigation.navigate('Home')
    }

    const logIn = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Name'
                value={name}
                autoCapitalize="none"
                placeholderTextColor='white'
                onChangeText={text => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                secureTextEntry={true}
                value={password}
                autoCapitalize="none"
                placeholderTextColor='white'
                onChangeText={text => setPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Email'
                autoCapitalize="none"
                value={email}
                placeholderTextColor='white'
                onChangeText={text => setEmail(text)}
            />
            <Button
                title='Sign Up'
                onPress={RegisterUser}
            />
            <View style={styles.link}>
                <Text>Already Have An Account?</Text>
                <Text style={{ color: 'green' }} onPress={logIn}>Log In</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    input: {
        width: 350,
        height: 55,
        backgroundColor: '#42A5F5',
        margin: 10,
        padding: 8,
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
    }
})

export default Signup