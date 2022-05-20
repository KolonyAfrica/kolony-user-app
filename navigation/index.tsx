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
import PickUpAndDelivery from '../screens/DeliveryRequest/pick-n-delivery.screens';
import ContactSearch from '../screens/DeliveryRequest/contact-search.screens';
import ItemDetails from '../screens/DeliveryRequest/item-details.screens';
import SelectPickup from '../screens/DeliveryRequest/select-pickup-type.screens';
import Summary from '../screens/DeliveryRequest/summary.screens';

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
          <Stack.Screen
            component={PickUpAndDelivery}
            name={ROOT_ROUTES.PICKUP_AND_DELIVERY}
          />
          <Stack.Screen
            component={ContactSearch}
            name={ROOT_ROUTES.CONTACT_SEARCH}
          />
          <Stack.Screen
            component={ItemDetails}
            name={ROOT_ROUTES.ITEM_DETAILS}
          />
          <Stack.Screen
            component={SelectPickup}
            name={ROOT_ROUTES.SELECT_PICKUP_TYPE}
          />
          <Stack.Screen component={Summary} name={ROOT_ROUTES.SUMMARY} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
