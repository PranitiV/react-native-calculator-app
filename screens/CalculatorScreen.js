require("./../lib/swisscalc.lib.format.js");
require("./../lib/swisscalc.lib.operator.js");
require("./../lib/swisscalc.lib.operatorCache.js");
require("./../lib/swisscalc.lib.shuntingYard.js");
require("../lib/swisscalc.display.numericDisplay.js");
require("../lib/swisscalc.display.memoryDisplay.js");
require("./../lib/swisscalc.calc.calculator.js");

import React from "react";
import { View, Text, StyleSheet, SafeAreaView, PanResponder } from 'react-native'
import CalculatorButton from "../components/CalculatorButton.js";
import CalculatorDisplay from "../components/CalculatorDisplay.js";


export default class CalculatorScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            display: "0",
            orientation: "portrait"
        }
        //initializing calculator
        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();

        //initializing PanResponder...

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) =>
                true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
                true,
            onPanResponderRelease: (evt, gestureState) => {
                if (Math.abs(gestureState.dx >= 50)) {
                    this.onBackSpace()
                }
            }
        })

    }

    onBackSpace = () => {
        this.calc.backspace();
        this.setState({ display: this.calc.getMainDisplay() })
    }

    onNumPress = (num) => {
        this.calc.addDigit(num)
        this.setState({ display: this.calc.getMainDisplay() })
    }

    onClear = () => {
        this.calc.clear();
        this.setState({ display: this.calc.getMainDisplay() })
    }

    onPlusMinus = () => {
        this.calc.negate();
        this.setState({ display: this.calc.getMainDisplay() })
    }

    onBinaryOperator = (operator) => {
        this.calc.addBinaryOperator(operator);
        this.setState({ display: this.calc.getMainDisplay() })
    }

    onEqual = () => {
        this.calc.equalsPressed();
        this.setState({ display: this.calc.getMainDisplay() })
    }

    onUnary = (operator) => {
        this.calc.addUnaryOperator();
        this.setState({ display: this.calc.getMainDisplay() })
    }

    renderPortrait() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.displayContainer} {...this.panResponder.panHandlers}>
                    <CalculatorDisplay display={this.state.display} />
                </View>
                <View style={styles.buttonContainer} >
                    <View style={styles.buttonRow}>
                        <CalculatorButton onPress={this.onClear} text="C" color='white' backgroundColor='rgb(208, 164, 235)' />
                        <CalculatorButton onPress={this.onPlusMinus} text="+/-" color='white' backgroundColor='rgb(208, 164, 235)' />
                        <CalculatorButton onPress={() => { this.onUnary(this.oc.PercentOperator) }} text="%" color='white' backgroundColor='rgb(208, 164, 235)' />
                        <CalculatorButton onPress={() => { this.onBinaryOperator(this.oc.DivisionOperator) }} text="/" color='white' backgroundColor='rgb(180, 99, 230)' />
                    </View>

                    <View style={styles.buttonRow}>
                        <CalculatorButton onPress={() => this.onNumPress("7")} text="7" color='white' backgroundColor='rgb(116, 48, 227)' />
                        <CalculatorButton onPress={() => this.onNumPress("8")} text="8" color='white' backgroundColor='rgb(116, 48, 227)' />
                        <CalculatorButton onPress={() => this.onNumPress("9")} text="9" color='white' backgroundColor='rgb(116, 48, 227)' />
                        <CalculatorButton onPress={() => { this.onBinaryOperator(this.oc.MultiplicationOperator) }} text="x" color='white' backgroundColor='rgb(180, 99, 230)' />
                    </View>

                    <View style={styles.buttonRow}>
                        <CalculatorButton onPress={() => this.onNumPress("4")} text="4" color='white' backgroundColor='rgb(116, 48, 227)' />
                        <CalculatorButton onPress={() => this.onNumPress("5")} text="5" color='white' backgroundColor='rgb(116, 48, 227)' />
                        <CalculatorButton onPress={() => this.onNumPress("6")} text="6" color='white' backgroundColor='rgb(116, 48, 227)' />
                        <CalculatorButton onPress={() => { this.onBinaryOperator(this.oc.SubtractionOperator) }} text="-" color='white' backgroundColor='rgb(180, 99, 230)' />
                    </View>

                    <View style={styles.buttonRow}>
                        <CalculatorButton onPress={() => this.onNumPress("1")} text="1" color='white' backgroundColor='rgb(116, 48, 227)' />
                        <CalculatorButton onPress={() => this.onNumPress("2")} text="2" color='white' backgroundColor='rgb(116, 48, 227)' />
                        <CalculatorButton onPress={() => this.onNumPress("3")} text="3" color='white' backgroundColor='rgb(116, 48, 227)' />
                        <CalculatorButton onPress={() => { this.onBinaryOperator(this.oc.AdditionOperator) }} text="+" color='white' backgroundColor='rgb(180, 99, 230)' />
                    </View>

                    <View style={styles.buttonRow}>
                        <CalculatorButton onPress={() => this.onNumPress("0")} text="0" color='white' backgroundColor='rgb(116, 48, 227)' style={{ flex: 2 }} />
                        <CalculatorButton onPress={() => this.onNumPress(".")} text="." color='white' backgroundColor='rgb(116, 48, 227)' />
                        <CalculatorButton onPress={this.onEqual} text="=" color='white' backgroundColor='rgb(180, 99, 230)' />
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderPortrait()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    displayContainer: {
        flex: 1,
        justifyContent: "flex-end",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonContainer: {
        paddingBottom: 20,
    },

})