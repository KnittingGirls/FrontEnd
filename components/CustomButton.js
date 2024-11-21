import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

export default class CustomButton extends Component {
    static defaultProps = {
        title: 'untitled',
        buttonColor: 'rgba(255,255,255,0.6)',
        titleColor: '#000',
        onPress: () => null,
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={[
                styles.button,
                { backgroundColor: this.props.buttonColor }
            ]}
                onPress={this.props.onPress}>
                <Text style={[
                    styles.title,
                    { color: this.props.titleColor }
                ]}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 140,
        height:40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        // fontFamily: 'Maplestory-Bold',
        fontWeight:'bold',
    },
});