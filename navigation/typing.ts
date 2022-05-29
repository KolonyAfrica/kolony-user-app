import {Rider} from '../screens/DeliveryPreview/find-rider.screens';

/** Root Routes */
export enum ROOT_ROUTES {
  ONBOARDING = 'OnBoarding',
  AUTHENTICATION = 'Authentication',
  MAIN_TAB = 'MainTab',
  PICKUP_AND_DELIVERY = 'PickUpAndDelivery',
  CONTACT_SEARCH = 'ContactSearch',
  ITEM_DETAILS = 'ItemDetails',
  SELECT_PICKUP_TYPE = 'SelectPickupType',
  SUMMARY = 'Summary',
  PAYMENT_SUMMARY = 'PaymentSummary',
  FIND_RIDER = 'FindRider',
  CANCEL_DELIVERY = 'CancelDelivery',
  CONFIRM_RIDER = 'ConfirmRider',
  USER_RIDER_CHAT = 'UserRiderChat',
  RIDER_FEEDBACK = 'RiderFeedback',
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

type DeliveryRequestFormParams = {
  progress: number;
  multiple: boolean;
};

/** Root route param list  */
export type RootStackParamList = {
  OnBoarding: undefined;
  Authentication: undefined;
  MainTab: undefined;
  PickUpAndDelivery: DeliveryRequestFormParams;
  ContactSearch: DeliveryRequestFormParams;
  ItemDetails: DeliveryRequestFormParams;
  SelectPickupType: DeliveryRequestFormParams;
  Summary: DeliveryRequestFormParams;
  PaymentSummary: DeliveryRequestFormParams;
  FindRider: Pick<DeliveryRequestFormParams, 'multiple'>;
  CancelDelivery: Pick<DeliveryRequestFormParams, 'multiple'>;
  ConfirmRider: {
    rider: Rider;
  } & Pick<DeliveryRequestFormParams, 'multiple'>;
  UserRiderChat: undefined;
  RiderFeedback: undefined;
};
