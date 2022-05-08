import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//components
import CreateAccountOptions from '../screens/Authentication/CreateAccount/create-account-options.screens';
import SignUpForm from '../screens/Authentication/SignUpForm/sign-up-form.screens';
import Login from '../screens/Authentication/login-form.screens';
import {AUTHENTICATION_ROUTES, AuthStackParamList} from './typing';
import VerifyOTPForm from '../screens/Authentication/VerifyOTP/verify-otp.screens';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={AUTHENTICATION_ROUTES.CREATE_ACCOUNT_OPTIONS}
        component={CreateAccountOptions}
      />
      <Stack.Screen
        name={AUTHENTICATION_ROUTES.SIGN_UP_FORM}
        component={SignUpForm}
      />
      <Stack.Screen name={AUTHENTICATION_ROUTES.LOGIN_FORM} component={Login} />
      <Stack.Screen
        name={AUTHENTICATION_ROUTES.VERIFY_OTP_FORM}
        component={VerifyOTPForm}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
