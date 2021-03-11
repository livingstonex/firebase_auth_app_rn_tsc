import firebase from 'firebase';
import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ApprovalRender, ButtonSmall } from '../components';

const App : FC = (props) => {
    const [posts, setPosts] = useState<any>(null);
     

    // Function to fetch all posts that are currently pending
    const fetchPendingPost = async () => {
        await firebase.firestore().collection('posts').where('approved', '==', false).onSnapshot(querySnapShot => {
            const post_documents = querySnapShot.docs;
            setPosts(post_documents);
        })
    }

    // onApprove Function
    const onApprove = async (id:any) => {
        // alert(`Item of ID ${id} would be approved.`);
        const post = await firebase.firestore().collection('posts').doc(id).get();
        post.ref.set({approved: true}, {merge: true});
    }

    // onReject Function
    const onReject = async (id:any) => {
        // alert(`Item of ID ${id} will be rejected`);
        await firebase.firestore().collection('posts').doc(id).delete();
    }

    // useEffect to run the fetch once, only when the page loads
    useEffect(()=>{
        fetchPendingPost();
    }, []);
    return (
        <View style={styles.container}>
            <Text>Dashboard Screen</Text>
            <ButtonSmall title="Back" onTap={() => props.navigation.goBack() }/>
            <FlatList 
                data={posts} 
                renderItem={
                    ({item}) => <ApprovalRender msg={item.data().msg} 
                                timeStamp={item.data().timeStamp} 
                                approved={item.data().approve} 
                                onApprove={() => onApprove(item.id)} 
                                onReject={() => onReject(item.id)} />} 
                />
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    }
})