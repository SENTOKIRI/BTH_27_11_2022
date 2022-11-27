import { View, TextInput, StyleSheet, Button, Text } from 'react-native'
import React, { useState } from 'react'
import { authentication } from '../firebase/firebase-config'
import { v4 as uuidv4 } from 'uuid';
import { ExploreState } from '../context/Context';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
    const { setUserId } = ExploreState();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = () => {
        navigation.navigate('Signup')
    }

    const LoginUser = async () => {
        const uid = uuidv4()
        setUserId(uid)
        await signInWithEmailAndPassword(authentication, email, password);
        navigation.navigate('Home')


    }
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Email'
                autoCapitalize="none"
                value={email}
                placeholderTextColor='white'
                onChangeText={text => setEmail(text)}
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
            <Button

                title='Log In'
                onPress={LoginUser}
            />
            <View style={styles.link}>
                <Text>Don't Have An Account?</Text>
                <Text style={{ color: 'green' }} onPress={signIn}>Sign In</Text>
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

export default Login