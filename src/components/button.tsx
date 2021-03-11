import React, {FC} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

interface Props {
    title: string;
    onTap: () => void;
}

const Button: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={props.onTap}>
                <Text style={styles.title}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Button;

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
    button: {
        width: width / 1.1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
    },
    title:{
        color: 'white',
        fontSize: 20
    }
})