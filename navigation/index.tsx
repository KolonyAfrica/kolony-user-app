import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigation from './AuthNavigation';
import MainTab from './BottomTabNavigation';
import {MODES, OnBoarding} from '../components/shared';
import {AppContext} from '../App';
import {STORAGE_KEYS} from '../constants';
import {RootStackParamList, ROOT_ROUTES} from './typing';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const {showOnBoarding} = React.useContext(AppContext);
  const handleGoToMainStack = React.useCallback(async (navigation: any) => {
    await AsyncStorage.setItem(STORAGE_KEYS.userHasVisitedApp, 'True');
    navigation.navigate('Authentication');
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          showOnBoarding ? 'OnBoarding' : ROOT_ROUTES.AUTHENTICATION
        }
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={ROOT_ROUTES.ONBOARDING}>
          {({navigation}) => (
            <OnBoarding
              mode={MODES.primary}
              goToNextScreen={() => handleGoToMainStack(navigation)}
            />
          )}
        </Stack.Screen>
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={ROOT_ROUTES.AUTHENTICATION}
            component={AuthNavigation}
          />
          <Stack.Screen name={ROOT_ROUTES.MAIN_TAB} component={MainTab} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
