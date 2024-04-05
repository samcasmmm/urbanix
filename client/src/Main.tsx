import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import About from './screens/About';
import SplashScreen from './screens/SplashScreen';

export type Route = {
  name: string;
  component: React.ComponentType<any>;
};

type RootStackParamList = {
  Splash: undefined;
  About: undefined;
};

export type NavigationType = NativeStackNavigationProp<RootStackParamList>;

const Routes: Route[] = [
  {name: 'Splash', component: SplashScreen},
  {name: 'About', component: About},
];

const Stack = createNativeStackNavigator<RootStackParamList>();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Splash'}>
        {Routes.map((item, index) => (
          <Stack.Screen
            key={index}
            name={item.name as keyof RootStackParamList}
            component={item.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
