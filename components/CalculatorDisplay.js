import React from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default class CalculatorDisplay extends React.Component {
    static defaultProps = {
        display: "",
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.display}>
                    {this.props.display}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        padding: 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',

    },
    display: {
        flex: 1,
        color: 'white',
        fontSize: 70,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        textAlignVertical: 'bottom'
    },
})