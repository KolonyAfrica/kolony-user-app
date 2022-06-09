import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigation from './AuthNavigation';
import MainTab from './BottomTabNavigation';
import {Chat, Feedback, MODES, OnBoarding} from '../components/shared';
import {AppContext} from '../App';
import {STORAGE_KEYS} from '../constants';
import {RootStackParamList, ROOT_ROUTES} from './typing';
import PickUpAndDelivery from '../screens/DeliveryRequest/pick-n-delivery.screens';
import ContactSearch from '../screens/DeliveryRequest/contact-search.screens';
import ItemDetails from '../screens/DeliveryRequest/item-details.screens';
import SelectPickup from '../screens/DeliveryRequest/select-pickup-type.screens';
import Summary from '../screens/DeliveryRequest/summary.screens';
import PaymentSummary from '../screens/DeliveryRequest/payment-summary-screens';
import FindRider from '../screens/DeliveryPreview/find-rider.screens';
import CancelDeliveryReason from '../screens/DeliveryPreview/cancel-delivery-reason.screens';
import ConfirmRider from '../screens/DeliveryPreview/confirm-rider.screens';
import AccountSetting from '../screens/Profile/account-setting.screens';
import NotificationSetting from '../screens/Profile/notification-setting.screens';
import PasswordSetting from '../screens/Profile/password-setting.screens';
import PaymentSettings from '../screens/Profile/payment-settings.screens';
import OrderDetails from '../screens/Orders/order-details.screens';
import TrackDelivery from '../screens/TrackDelivery/track-delivery.screens';
import SetLandMark from '../screens/LandMark/set-landmark.screens';

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
          <Stack.Screen
            component={PaymentSummary}
            name={ROOT_ROUTES.PAYMENT_SUMMARY}
          />
          <Stack.Screen component={FindRider} name={ROOT_ROUTES.FIND_RIDER} />
          <Stack.Screen
            component={CancelDeliveryReason}
            name={ROOT_ROUTES.CANCEL_DELIVERY}
          />
          <Stack.Screen
            component={ConfirmRider}
            name={ROOT_ROUTES.CONFIRM_RIDER}
          />
          <Stack.Screen name={ROOT_ROUTES.USER_RIDER_CHAT}>
            {() => <Chat type="primary" />}
          </Stack.Screen>
          <Stack.Screen name={ROOT_ROUTES.RIDER_FEEDBACK}>
            {({navigation}) => (
              <Feedback
                type="primary"
                onSubmit={() => navigation.navigate(ROOT_ROUTES.MAIN_TAB)}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            component={AccountSetting}
            name={ROOT_ROUTES.ACCOUNT_SETTINGS}
          />

          <Stack.Screen
            component={NotificationSetting}
            name={ROOT_ROUTES.NOTIFICATION_SETTINGS}
          />
          <Stack.Screen
            component={PasswordSetting}
            name={ROOT_ROUTES.PASSWORD_SETTINGS}
          />
          <Stack.Screen
            component={PaymentSettings}
            name={ROOT_ROUTES.PAYMENT_SETTINGS}
          />
          <Stack.Screen
            component={OrderDetails}
            name={ROOT_ROUTES.ORDER_DETAILS}
          />
          <Stack.Screen
            component={TrackDelivery}
            name={ROOT_ROUTES.TRACK_DELIVERY}
          />
          <Stack.Screen
            component={SetLandMark}
            name={ROOT_ROUTES.SET_LANDMARK}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
