import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ApprovalRender, Button, Input, PostRenderer } from '../components';
import firebase from 'firebase';


const App : FC = (props) => {
    const [msg, setMsg] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [posts, setPosts] = useState<any>([]);

    // Create a useEffect to call the fetchCurrentUser once when page loads
    useEffect(()=>{
        fetchCurrentUser();
        fetchApprovedPosts();
    }, []);


    // LogOut Function
    const signout = () => {
        firebase.auth().signOut();
    }

    // Get the current logged in user
    const fetchCurrentUser = async () => {
        const uid = firebase.auth().currentUser?.uid;
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUser({id: user.id, ...user.data()});
    }


    // Post Message
    const post = async () => {
        if(msg){
            const data = {
                msg,
                timeStamp: Date.now(),
                approved: false
            }

            try {
                await firebase.firestore().collection('posts').add(data);
            } catch (error) {
                console.log(error);
                alert(error);
            }
        }else{
            alert('Fill in a Message');
        }
    }

    // Get all aproved post
    const fetchApprovedPosts = async () => {
        // const posts = await firebase.firestore().collection('posts').where('approved', '==', true).get();
        // setPosts([...posts.docs]);
        await firebase.firestore().collection('posts').where('approved', '==', true).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setPosts(documents);
        })
        
    }

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title="LogOut" onTap={() => signout() }/>

            <Text>Approved Posts</Text>
            { 
                posts.length > 0 ? (<FlatList data={posts} 
                                             renderItem={({item}) => <PostRenderer msg={item.data().msg} 
                                             timeStamp={item.data().timeStamp} 
                                             approved={item.data().approved} /> } 
                                        /> )
                            : (<View style={styles.nothing}><Text>No Approved Posts Yet</Text></View>) 
            }


            <View>
                <Input placeholder="Write your post" onChangeText={(text) => setMsg(text)}/>

                <Button title="Post Message" onTap={() => post() }/>
            </View>
            { user ? user.isAdmin ? (
                <View>
                    <Button title="Dashboard" onTap={() => props.navigation.navigate("dashboard") }/>
                </View>
            ) : null : null }
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nothing: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})