import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View, Text, BackHandler, TextInput, Button } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function CalculatorScreen({route, navigation}) {

    const [investedAmount, setInvestedAmount] = useState('');
    const [percentage, setPercentage] = useState('');
    const [result, setResult] = useState('');

    const handleCalculate = () => {
        const amount = parseFloat(investedAmount);
        const percent = parseFloat(percentage) / 100;

        const change = amount * percent;

        if (percentage >= 0) {
            setResult(`You made $${change.toFixed(2)}`);
        } else {
            setResult(`You lost $${Math.abs(change).toFixed(2)}`);
        }
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', close);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', close);
        }
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#f0f0f0'
            },
            headerRight: () => (
                <View style={styles.headerButtonContainer}>
                    <Text style={styles.headerButtonText}>Crypto</Text>
                    <AntDesign
                        style={styles.navButton}
                        name="arrowright"
                        size={23}
                        onPress={() => navigation.navigate('Crypto')}
                    />
                </View>
            ),
            headerLeft: () => (
                <View style={styles.headerButtonContainer}>
                    <AntDesign
                        style={styles.navButton}
                        name="arrowleft"
                        size={23}
                        onPress={() => navigation.navigate('Weather')}
                    />
                    <Text style={styles.headerButtonText}>Weather</Text>
                </View>
            )
        })
    }, [])

    function close() {
        navigation.goBack(null);
        return true;
    }

    return (
        <View style={styles.container}>
            <Text>Calculator Screen</Text>
            <TextInput
                style={styles.input}
                placeholder="Invested Amount"
                keyboardType="numeric"
                onChangeText={text => setInvestedAmount(text)}
                value={investedAmount}
            />
            <TextInput
                style={styles.input}
                placeholder="Percentage (up or down)"
                keyboardType="numeric"
                onChangeText={text => setPercentage(text)}
                value={percentage}
            />
            <Button title="Calculate" onPress={handleCalculate} />
            <Text style={styles.resultText}>Result: {result}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b0e0e6',
        padding: 10,
        
    },
    headerButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10
    },
    headerButtonText: {
        fontSize: 16,
        marginRight: 5,
    },
    navButton: {
        padding: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    resultText: {
        marginTop: 20,
        fontSize: 18,
        
    },
});
