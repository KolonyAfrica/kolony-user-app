import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/home.screens';
import Order from '../screens/Orders/order.screens';
import Notification from '../screens/Notification/notification.screens';
import Profile from '../screens/Profile/profile.screens';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Account" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainTab;
