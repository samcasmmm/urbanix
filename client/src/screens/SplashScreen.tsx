import {Route, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationType} from '../Main';

const SplashScreen = () => {
  const navigation = useNavigation<NavigationType>();
  useEffect(() => {
    setTimeout(() => navigation.navigate('About'), 1000);
  }, []);
  return (
    <View style={styles.container}>
      <Text>Splash Screen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
