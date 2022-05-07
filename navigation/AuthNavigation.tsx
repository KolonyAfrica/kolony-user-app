import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//components
import CreateAccountOptions from '../screens/Authentication/create-account-options.screens';
import SignUpForm from '../screens/Authentication/sign-up-form.screens';
import Login from '../screens/Authentication/login-form.screens';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateAccountOptions"
        component={CreateAccountOptions}
      />
      <Stack.Screen name="SignUpForm" component={SignUpForm} />
      <Stack.Screen name="LoginForm" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
