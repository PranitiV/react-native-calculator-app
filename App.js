import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CalculatorScreen from './screens/CalculatorScreen';
import CalculatorDisplay from './components/CalculatorDisplay';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <StatusBar translucent = {true} backgroundColor="transparent" /> */}
      <CalculatorScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});
