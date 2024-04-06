import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationType} from '../Main';

const About = () => {
  const navigation = useNavigation<NavigationType>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Splash');
          console.log('yes');
        }}
        style={{backgroundColor: 'purple', padding: 10, width: 100}}
      />
      <Button title="asd" onPress={() => console.log('yes')} />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
