import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, BackHandler, Button } from "react-native";
import investingQuotes from '../data/Quotes';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign

export default function QuoteScreen({ route, navigation }) {
    const [quote, setQuote] = useState("");

    

    useEffect(() => {
        getRandomQuote();

        
        BackHandler.addEventListener('hardwareBackPress', close);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', close);
        }
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#f0f0f0'
            },
            headerRight: () => (
                <View style={styles.headerButtonContainer}>
                    <Text style={styles.headerButtonText}>Weather</Text> 
                    <AntDesign
                        style={styles.navButton}
                        name="arrowright"
                        size={23}
                        onPress={() => navigation.navigate('Weather', )}
                    />
                </View>
            ),
            headerLeft: () => (
                <View style={styles.headerButtonContainer}>
                    
                    <AntDesign
                        style={styles.navButton}
                        name="arrowleft"
                        size={23}
                        onPress={() => navigation.navigate('Crypto', )}
                    />
                    <Text style={styles.headerButtonText}>Crypto</Text> 
                </View>
            )
        })
    }, )

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * investingQuotes.length);
        setQuote(investingQuotes[randomIndex]);
    };

    function close() {
        navigation.goBack(null);
        return true;
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#f0f0f0'
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.quoteText}>{quote}</Text>
            <Button title="New Quote" onPress={getRandomQuote} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#b0e0e6',
      alignItems: 'center',
      justifyContent: 'space-between',
    paddingTop: 150,
    paddingBottom: 150,
    
    
    },
    quoteText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        margin: 20, // margin around the text
        padding: 10, // padding inside the text container
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // a light white background with some transparency
        borderRadius: 20, // rounded corners
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // for android
    },
    
    headerButtonContainer: {
      flexDirection: 'row', // set direction to row to place text and icon in one line
      alignItems: 'center',
      marginHorizontal: 10  // give some spacing from the edges
    },
    headerButtonText: {
      fontSize: 16,
      marginRight: 5, // space between text and icon
    },
    navButton: {
      padding: 5, // this will make it more touchable
    }
  });

