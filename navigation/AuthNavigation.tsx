import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//components
import CreateAccountOptions from '../screens/Authentication/CreateAccount/create-account-options.screens';
import SignUpForm from '../screens/Authentication/SignUpForm/sign-up-form.screens';
import Login from '../screens/Authentication/Login/login-form.screens';
import {AUTHENTICATION_ROUTES, AuthStackParamList} from './typing';
import VerifyOTPForm from '../screens/Authentication/VerifyOTP/verify-otp.screens';
import ForgotPassword from '../screens/Authentication/ForgotPassword/forgot-password.screens';
import ResetPassword from '../screens/Authentication/ResetAccount/reset-password.screens';

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
      <Stack.Screen
        name={AUTHENTICATION_ROUTES.RESET_PASSWORD_FORM}
        component={ResetPassword}
      />
      <Stack.Screen
        name={AUTHENTICATION_ROUTES.FORGOT_PASSWORD_FORM}
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
