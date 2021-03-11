import React, {FC} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ButtonSmall } from './';

const { width, height } = Dimensions.get('screen');


interface Props {
    msg: string;
    approved: string;
    timeStamp: number;
    onApprove: () => void;
    onReject: () => void;
}

const formatTime = (timeStamp: number): string => {
    const calculatedTime = Date.now() - timeStamp;
    if(calculatedTime > 1000) return `${calculatedTime / 1000} s`;
    if((calculatedTime / 1000) > 60) return `${(calculatedTime / 1000) / 60 } min`;
    if(((calculatedTime / 1000) / 60) > 60 ) return `${((calculatedTime / 1000) / 60) / 60 } hr`;
    else return `${(((calculatedTime / 1000) / 60 ) / 60) / 24} d`;

}

const App: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.topTextView}>
                <Text>{props.msg}</Text>
                {/* <Text>{props.approved}</Text> */}
                <Text style={styles.date}>{formatTime(props.timeStamp)}</Text>
            </View>
            <View style={styles.buttonView}>
                <ButtonSmall title="Approve" onTap={props.onApprove}/>
                <ButtonSmall title="Reject" onTap={props.onReject}/>
            </View>
           
        </View>
    );
}

export default App;


const styles = StyleSheet.create({
    container: {
        width: width / 1.1,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowColor: '#ccc',
        shadowOpacity: 0.9,
        marginTop: 40
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    topTextView: {
        padding: 20,
    },
    date:{
        marginTop: 10
    }
})