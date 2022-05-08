import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Linking,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BaseTextInput,
  Button,
  BUTTON_TYPES,
  Icon,
  ICON_NAME,
  INPUT_MODES,
  MARGIN_SIZES,
} from '../../../components/shared';
import {
  ExternalLink,
  FormFooterText,
  HorizontalWrapper,
  Link,
  ScreenTitle,
  ScreenWrapper,
  VerticalWrapper,
} from '../../../components/shared/common/styles';
import GoBack from '../../../components/shared/GoBack';
import Spacing from '../../../components/shared/Spacing';
import {
  AUTHENTICATION_ROUTES,
  AuthStackParamList,
} from '../../../navigation/typing';
import {SignUpFormFooterText} from './styles';

type NavigationProp = NativeStackScreenProps<
  AuthStackParamList,
  AUTHENTICATION_ROUTES.SIGN_UP_FORM
>;

const SignUpForm = () => {
  const navigation = useNavigation<NavigationProp['navigation']>();

  const [hidePassword, setHidePassword] = React.useState<boolean>(true);

  const togglePasswordVisibility = React.useCallback(
    () => setHidePassword(v => !v),
    [],
  );

  const handleExternalLink = React.useCallback(async () => {
    await Linking.openURL('https://kolony.africa');
  }, []);

  return (
    <ScreenWrapper>
      <SafeAreaView>
        <GoBack />
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <ScreenTitle>Create an Account</ScreenTitle>
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <BaseTextInput
          label="First Name"
          placeholder="Shuaib"
          autoComplete="name"
          autoFocus
          returnKeyLabel="next"
          returnKeyType="next"
          mode={INPUT_MODES.default}
          fill
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        <BaseTextInput
          label="Last Name"
          placeholder="Ibikunle"
          autoComplete="name"
          returnKeyLabel="next"
          returnKeyType="next"
          mode={INPUT_MODES.default}
          fill
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        <BaseTextInput
          label="Email"
          placeholder="!ibikubleshuaib@gmail.com"
          autoComplete="email"
          mode={INPUT_MODES.default}
          returnKeyLabel="next"
          returnKeyType="next"
          keyboardType="email-address"
          fill
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        <BaseTextInput
          label="Phone Number"
          placeholder="(+234)"
          autoComplete="tel"
          mode={INPUT_MODES.default}
          returnKeyLabel="next"
          returnKeyType="next"
          keyboardType="phone-pad"
          fill
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        <BaseTextInput
          label="Password"
          placeholder="**********"
          secureTextEntry={hidePassword}
          mode={INPUT_MODES.default}
          rightIcon={() =>
            hidePassword ? (
              <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
                <Icon name={ICON_NAME.eye} />
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
                <Icon name={ICON_NAME.eyeSlash} />
              </TouchableWithoutFeedback>
            )
          }
          fill
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        <VerticalWrapper>
          <SignUpFormFooterText>
            By creating an account, you have agreed to our
          </SignUpFormFooterText>
          <TouchableOpacity onPress={handleExternalLink}>
            <ExternalLink>Terms of Service</ExternalLink>
          </TouchableOpacity>
        </VerticalWrapper>
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <Button
          type={BUTTON_TYPES.primary}
          text="Continue"
          fill
          onPress={() =>
            navigation.navigate(AUTHENTICATION_ROUTES.VERIFY_OTP_FORM, {
              origin: 'new-account',
            })
          }
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <VerticalWrapper>
          <HorizontalWrapper>
            <FormFooterText>Already have an account?</FormFooterText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(AUTHENTICATION_ROUTES.LOGIN_FORM)
              }>
              <Link> Login</Link>
            </TouchableOpacity>
          </HorizontalWrapper>
        </VerticalWrapper>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default SignUpForm;
