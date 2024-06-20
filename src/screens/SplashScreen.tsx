import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {NavigationType} from '../Main';
import LinearGradientView from '../components/common/LinearGradientView';

const SplashScreen = () => {
  const navigation = useNavigation<NavigationType>();
  useEffect(() => {
    setTimeout(() => navigation.navigate('About'), 1000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar animated={true} hidden={true} />
      <Image
        source={require('../assets/Images/Onboarding.png')}
        style={styles.coverImg}
      />
      <LinearGradientView
        colors={['#1F4C6B', '#1F4C6B30']}
        style={styles.imgoverlay}
      />
      <View style={styles.content}>
        <Text style={{color: 'red'}}>hello</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  coverImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
  },
  imgoverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
