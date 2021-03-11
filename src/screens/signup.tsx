import React, { FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Button } from '../components';
import firebase from 'firebase';
import 'firebase/firestore';

const App : FC = (props) => {
    const [name, setName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    
    // SingUp Function
    const signup = async () => {
        if(name && email && password){
            try {
               const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
               if(user){
                //    alert(JSON.stringify(user));
                await firebase.firestore().collection('users').doc(user.uid).set({name, email, password})
               }
            } catch (error) {
                console.log(error);
                alert(error);
            }
        }else {
            alert("Missing Fields");
        }   
    }
    return (
        <View style={styles.container}>
            <Text>SignUp Screen</Text>
            <Input placeholder="Enter Name" onChangeText={(text) => setName(text)}/>
            <Input placeholder="Enter Email" onChangeText={(text) => setEmail(text)}/>
            <Input placeholder="Enter Password" secureTextEntry  onChangeText={(text) => setPassword(text)}/>

            <Button title="Sign Up" onTap={() => signup() }/>

            <View style={styles.bottomText}>
                <Text>Already have an Account? </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('login')}>
                    <Text style={{color: 'blue'}}>Login Here</Text>
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