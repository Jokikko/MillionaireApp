import React, { useEffect, useLayoutEffect } from 'react'
import { StyleSheet, View, Text, BackHandler } from "react-native";
import Position from '../components/Position';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign

export default function WeatherScreen({route,navigation})
{
    useEffect(() =>{
        
        BackHandler.addEventListener('hardwareBackPress',close);
        return() => {
            BackHandler.removeEventListener('hardwareBackPress',close);
        }
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#f0f0f0'
            },
            headerRight: () => (
                <View style={styles.headerButtonContainer}>
                    <Text style={styles.headerButtonText}>Calculator</Text> 
                    <AntDesign
                        style={styles.navButton}
                        name="arrowright"
                        size={23}
                        onPress={() => navigation.navigate('Calculator', )}
                    />
                </View>
            ),
            headerLeft: () => (
                <View style={styles.headerButtonContainer}>
                    
                    <AntDesign
                        style={styles.navButton}
                        name="arrowleft"
                        size={23}
                        onPress={() => navigation.navigate('Quotes', )}
                    />
                    <Text style={styles.headerButtonText}>Quotes</Text> 
                </View>
            )
        })
    }, )

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
    })

    return(
        <Position />

    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#b0e0e6',
      alignItems: 'center',
      justifyContent: 'center',
      
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

