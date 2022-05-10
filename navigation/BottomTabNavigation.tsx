import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/home.screens';
import Order from '../screens/Orders/order.screens';
import Notification from '../screens/Notification/notification.screens';
import Profile from '../screens/Profile/profile.screens';
import {MainTabStackParamList, MAIN_TAB} from './typing';
import {Icon, ICON_NAME} from '../components/shared';
import {useTheme} from 'styled-components';
import {SCREEN_HEIGHT} from '../components/shared/common/constants';

const Tab = createBottomTabNavigator<MainTabStackParamList>();

const MainTab = () => {
  const theme = useTheme();

  const tabBarOptions = (name: ICON_NAME) => ({
    tabBarIcon: (props: {focused: boolean; color: string; size: number}) => (
      <Icon
        name={name}
        color={
          props.focused
            ? theme.palette.primary.blue
            : theme.palette.tertiary.grey430
        }
      />
    ),
    tabBarLabelStyle: {
      fontFamily: theme.fontTypes.body,
      fontSize: theme.fontSizes.tiny,
    },
    tabBarActiveTintColor: theme.palette.primary.blue,
    tabBarInactiveTintColor: theme.palette.tertiary.grey430,
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: SCREEN_HEIGHT * 0.101,
          paddingTop: theme.padding.small,
          borderTopWidth: 0,
          backgroundColor: '#ffffff',
          shadowColor: '#000000',
          elevation: 8,
          shadowOpacity: 0.05,
          shadowRadius: 24,
          shadowOffset: {
            height: 4,
            width: 4,
          },
        },
      }}>
      <Tab.Screen
        name={MAIN_TAB.HOME}
        component={Home}
        options={{
          ...tabBarOptions(ICON_NAME.home),
        }}
      />
      <Tab.Screen
        name={MAIN_TAB.ORDER}
        component={Order}
        options={{
          ...tabBarOptions(ICON_NAME.orderBag),
        }}
      />
      <Tab.Screen
        name={MAIN_TAB.NOTIFICATION}
        component={Notification}
        options={{
          ...tabBarOptions(ICON_NAME.notification),
        }}
      />
      <Tab.Screen
        name={MAIN_TAB.ACCOUNT}
        component={Profile}
        options={{
          ...tabBarOptions(ICON_NAME.profileAccount),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
