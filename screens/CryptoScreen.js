import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons'; 
import diamondhandsImage from '../assets/diamondhands.png';

const CryptoScreen = ({ navigation }) => { 
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState({ BTC: null, ETH: null, XRP: null });
  const [message, setMessage] = useState('Testing');

  useEffect(() => {
    const interval = setInterval(() => fetchCryptoPrices(), 60000); // Trying to get latest prices every 1 minute, sometimes fails because their api is slow.
    fetchCryptoPrices();
    return () => clearInterval(interval);
  }, []);
  
  useLayoutEffect(() => {
    navigation.setOptions({
        headerStyle: {
            backgroundColor: '#f0f0f0'
        },
        headerRight: () => (
            <View style={styles.headerButtonContainer}>
                <Text style={styles.headerButtonText}>Quotes</Text> 
                <AntDesign
                    style={styles.navButton}
                    name="arrowright"
                    size={23}
                    onPress={() => navigation.navigate('Quotes', {message: message})}
                />
            </View>
        ),
        headerLeft: () => (
            <View style={styles.headerButtonContainer}>
                
                <AntDesign
                    style={styles.navButton}
                    name="arrowleft"
                    size={23}
                    onPress={() => navigation.navigate('Calculator', {message: message})}
                />
                <Text style={styles.headerButtonText}>Calculator</Text> 
            </View>
        )
    })
}, [message, navigation])


  const fetchCryptoPrices = async () => {
    try {
      const coins = ['bitcoin', 'ethereum', 'ripple'];
      const promises = coins.map(coin => axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`));
      
      const responses = await Promise.all(promises);
  
      const btcPrice = responses[0].data.bitcoin.usd;
      const ethPrice = responses[1].data.ethereum.usd;
      const xrpPrice = responses[2].data.ripple.usd;
      
      setPrices({ BTC: btcPrice, ETH: ethPrice, XRP: xrpPrice });
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch cryptocurrency prices:', error);
      setLoading(false);
    }
  };
  
  

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          
          <Text style={styles.header}>Prices:</Text>
          <Text style={styles.price}>Bitcoin: ${prices.BTC?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
          <Text style={styles.price}>Ethereum: ${prices.ETH?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
          <Text style={styles.price}>XRP: ${prices.XRP?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
          <Image source={diamondhandsImage} style={styles.diamondhandsImage} />
        </>
      )}
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b0e0e6',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  header: {
    fontStyle: 'italic',
    fontWeight: '900',
    marginBottom: 1,
    fontSize: 60
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
  diamondhandsImage: {
    width: 300,
    height: 250,
    
  }
});

export default CryptoScreen;
