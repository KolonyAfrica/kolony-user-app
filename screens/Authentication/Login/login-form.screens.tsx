import React from 'react';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components';
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
  FormFooterText,
  HorizontalWrapper,
  Link,
  ScreenTitle,
  ScreenWrapper,
} from '../../../components/shared/common/styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import GoBack from '../../../components/shared/GoBack';
import Spacing from '../../../components/shared/Spacing';
import {
  AUTHENTICATION_ROUTES,
  AuthStackParamList,
  RootStackParamList,
  ROOT_ROUTES,
} from '../../../navigation/typing';

type LoginFormNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'LoginForm'>,
  NativeStackScreenProps<RootStackParamList>
>;

const Login = () => {
  const theme = useTheme();
  const navigation = useNavigation<LoginFormNavigationProps['navigation']>();
  const [hidePassword, setHidePassword] = React.useState<boolean>(true);

  const togglePasswordVisibility = React.useCallback(
    () => setHidePassword(v => !v),
    [],
  );

  return (
    <KeyboardAwareScrollView>
    <ScreenWrapper>
      <SafeAreaView>
        <GoBack />
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <ScreenTitle>Login into your Account</ScreenTitle>
        <Spacing direction="vertical" />
        <FormFooterText>Welcome back comrade!</FormFooterText>
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <BaseTextInput
          label="Email / Phone / UserID"
          placeholder="Enter email or userId or phone number"
          autoFocus
          returnKeyLabel="next"
          returnKeyType="next"
          mode={INPUT_MODES.default}
          fill
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        <BaseTextInput
          label="Password"
          placeholder="Enter Password"
          autoComplete="name"
          autoFocus
          mode={INPUT_MODES.default}
          fill
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
        />
        <Spacing direction="vertical" />
        <HorizontalWrapper justify="flex-end">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(AUTHENTICATION_ROUTES.FORGOT_PASSWORD_FORM)
            }>
            <Link>Forgot Password?</Link>
          </TouchableOpacity>
        </HorizontalWrapper>
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <Button
          type={BUTTON_TYPES.primary}
          text="Login"
          fill
          onPress={() => navigation.navigate(ROOT_ROUTES.MAIN_TAB)}
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <Button
          type={BUTTON_TYPES.ghost}
          leftIcon={() => <Icon key="google" name={ICON_NAME.google} />}
          textColor={theme.palette.tertiary.grey420}
          text="Continue with Google"
          fill
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <Button
          type={BUTTON_TYPES.ghost}
          leftIcon={() => <Icon key="facebook" name={ICON_NAME.facebook} />}
          textColor={theme.palette.tertiary.grey420}
          text="Continue with Facebook"
          fill
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <HorizontalWrapper justify="center">
          <FormFooterText>Don't have an account?</FormFooterText>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(AUTHENTICATION_ROUTES.CREATE_ACCOUNT_OPTIONS)
            }>
            <Link> Sign Up</Link>
          </TouchableOpacity>
        </HorizontalWrapper>
      </SafeAreaView>
    </ScreenWrapper>
    </KeyboardAwareScrollView>
  );
};

export default Login;
