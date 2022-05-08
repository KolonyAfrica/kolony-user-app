import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/home.screens';
import Order from '../screens/Orders/order.screens';
import Notification from '../screens/Notification/notification.screens';
import Profile from '../screens/Profile/profile.screens';
import {MainTabStackParamList, MAIN_TAB} from './typing';

const Tab = createBottomTabNavigator<MainTabStackParamList>();

const MainTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={MAIN_TAB.HOME} component={Home} />
      <Tab.Screen name={MAIN_TAB.ORDER} component={Order} />
      <Tab.Screen name={MAIN_TAB.NOTIFICATION} component={Notification} />
      <Tab.Screen name={MAIN_TAB.ACCOUNT} component={Profile} />
    </Tab.Navigator>
  );
};

export default MainTab;
