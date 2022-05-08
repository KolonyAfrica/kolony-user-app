/** Root Routes */
export enum ROOT_ROUTES {
  ONBOARDING = 'OnBoarding',
  AUTHENTICATION = 'Authentication',
  MAIN_TAB = 'MainTab',
}

/** Auth Routes */
export enum AUTHENTICATION_ROUTES {
  CREATE_ACCOUNT_OPTIONS = 'CreateAccountOptions',
  SIGN_UP_FORM = 'SignUpForm',
  LOGIN_FORM = 'LoginForm',
  VERIFY_OTP_FORM = 'VerifyOTPForm',
}

/** Bottom Tab navigation routes */
export enum MAIN_TAB {
  HOME = 'Home',
  ORDER = 'Order',
  NOTIFICATION = 'Notification',
  ACCOUNT = 'Account',
}

/** MainTab route param list  */
export type MainTabStackParamList = {
  Home: undefined;
  Order: undefined;
  Notification: undefined;
  Account: undefined;
};

/** Authentication route param list  */
export type AuthStackParamList = {
  CreateAccountOptions: undefined;
  SignUpForm: undefined;
  LoginForm: undefined;
  VerifyOTPForm: {origin: 'reset-account' | 'new-account'} | undefined;
};

/** Root route param list  */
export type RootStackParamList = {
  OnBoarding: undefined;
  Authentication: undefined;
  MainTab: undefined;
};
