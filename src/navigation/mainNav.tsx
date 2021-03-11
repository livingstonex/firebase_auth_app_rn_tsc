import React,{ FC, useState, useEffect } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import firebase from 'firebase';
import AuthStack from './authstack';
import AppStack from './appstack';


const MainStack : FC = () => {
    const [user, setUser] = useState<any>(null);

    const bootstrap = () => {
        firebase.auth().onAuthStateChanged(_user => {
            if(_user){
                setUser(_user);
            }else{
                setUser(null);
            }
        });

    }

    useEffect(()=>{
        bootstrap();
    },[]);
    return (
        <NavigationContainer>
            { user !== null ? <AppStack/> : <AuthStack/> }
        </NavigationContainer>
    );
}

export default MainStack;