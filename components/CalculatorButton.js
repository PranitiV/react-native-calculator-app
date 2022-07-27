import React from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default class CalculatorButton extends React.Component {

    static defaultProps = {
        onPress: function () { },
        title: "",
        color: "white",
        backgroundColor: "black",
        style: {},
    }

    render() {
        var bc = this.props.backgroundColor;

        return (
            <TouchableOpacity style={[styles.container, { backgroundColor: bc }, {...this.props.style}]} onPress={this.props.onPress}>
                <Text style={[styles.text, { color: this.props.color }]}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 40,
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
    },
})