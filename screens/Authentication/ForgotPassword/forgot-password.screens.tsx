import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BaseTextInput,
  Button,
  BUTTON_TYPES,
  INPUT_MODES,
  MARGIN_SIZES,
} from '../../../components/shared';
import {
  FormFooterText,
  ScreenTitle,
  ScreenWrapper,
} from '../../../components/shared/common/styles';
import GoBack from '../../../components/shared/GoBack';
import Spacing from '../../../components/shared/Spacing';
import {
  AUTHENTICATION_ROUTES,
  AuthStackParamList,
} from '../../../navigation/typing';

type NavigationProp = NativeStackScreenProps<
  AuthStackParamList,
  AUTHENTICATION_ROUTES.FORGOT_PASSWORD_FORM
>;

const ForgotPassword = () => {
  const navigation = useNavigation<NavigationProp['navigation']>();

  const handleSubmit = () => {
    navigation.navigate(AUTHENTICATION_ROUTES.VERIFY_OTP_FORM, {
      origin: 'reset-account',
    });
  };

  return (
    <ScreenWrapper>
      <SafeAreaView>
        <GoBack />
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <ScreenTitle>Forgot Password</ScreenTitle>
        <Spacing direction="vertical" />
        <FormFooterText>
          Enter your registered email to reset your password
        </FormFooterText>
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <BaseTextInput
          label="Email Address"
          placeholder="!ibikubleshuaib@gmail.com"
          autoComplete="email"
          autoFocus
          mode={INPUT_MODES.default}
          fill
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <Button
          type={BUTTON_TYPES.primary}
          text="Submit"
          fill
          onPress={handleSubmit}
        />
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default ForgotPassword;
