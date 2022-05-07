import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigation from './AuthNavigation';
import MainTab from './BottomTabNavigation';
import {MODES, OnBoarding} from '../components/shared';
import {AppContext} from '../App';
import {STORAGE_KEYS} from '../constants';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {showOnBoarding} = React.useContext(AppContext);

  const handleGoToMainStack = React.useCallback(async (navigation: any) => {
    await AsyncStorage.setItem(STORAGE_KEYS.userHasVisitedApp, 'True');
    navigation.navigate('Authentication');
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={showOnBoarding ? 'OnBoarding' : 'Authentication'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoarding">
          {({navigation}) => (
            <OnBoarding
              mode={MODES.primary}
              goToNextScreen={() => handleGoToMainStack(navigation)}
            />
          )}
        </Stack.Screen>
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Authentication" component={AuthNavigation} />
          <Stack.Screen name="Root" component={MainTab} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
