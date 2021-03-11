import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button } from '../components';
import firebase from 'firebase';

const App : FC = (props) => {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const login = async () => {
        if(email && password){
            try {
                const {user} = await firebase.auth().signInWithEmailAndPassword(email, password);

            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <Input placeholder="Enter Email" onChangeText={(text) => setEmail(text)}/>
            <Input placeholder="Enter Password" secureTextEntry  onChangeText={(text) => setPassword(text)}/>

            <Button title="Login" onTap={() => login() }/>

            <View style={styles.bottomText}>
                <Text>Don't have an Account? </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('signup')}>
                    <Text style={{color: 'blue'}}>Register Here</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomText: {
        flexDirection: 'row',
        // alignContent: 'space-between',
        justifyContent: 'space-between'
    }
})