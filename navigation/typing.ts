/** Root Routes */
export enum ROOT_ROUTES {
  ONBOARDING = 'OnBoarding',
  AUTHENTICATION = 'Authentication',
  MAIN_TAB = 'MainTab',
  PICKUP_AND_DELIVERY = 'PickUpAndDelivery',
}

/** Auth Routes */
export enum AUTHENTICATION_ROUTES {
  CREATE_ACCOUNT_OPTIONS = 'CreateAccountOptions',
  SIGN_UP_FORM = 'SignUpForm',
  LOGIN_FORM = 'LoginForm',
  VERIFY_OTP_FORM = 'VerifyOTPForm',
  FORGOT_PASSWORD_FORM = 'ForgotPasswordForm',
  RESET_PASSWORD_FORM = 'ResetPasswordForm',
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
  ForgotPasswordForm: undefined;
  ResetPasswordForm: undefined;
};

/** Root route param list  */
export type RootStackParamList = {
  OnBoarding: undefined;
  Authentication: undefined;
  MainTab: undefined;
  PickUpAndDelivery: {
    progress: number;
    multiple: boolean;
  };
};
