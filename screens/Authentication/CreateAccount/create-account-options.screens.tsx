import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Button,
  BUTTON_TYPES,
  Icon,
  ICON_NAME,
  MARGIN_SIZES,
} from '../../../components/shared';
import {
  FormFooterText,
  HorizontalWrapper,
  Link,
  ScreenWrapper,
} from '../../../components/shared/common/styles';
import Spacing from '../../../components/shared/Spacing';
import {theme} from '../../../components/shared/theme';
import {
  AUTHENTICATION_ROUTES,
  AuthStackParamList,
} from '../../../navigation/typing';
import {
  CreateAccountLogoBox,
  CreateAccountOptionsBox,
  StyledLogo,
} from './styles';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {STORAGE_KEYS} from '../../../constants';

type NavigationProp = NativeStackScreenProps<
  AuthStackParamList,
  AUTHENTICATION_ROUTES.CREATE_ACCOUNT_OPTIONS
>;

const CreateAcctOptions = () => {
  const navigation = useNavigation<NavigationProp['navigation']>();
  // React.useEffect(() => {
  //   (async () =>
  //     await AsyncStorage.setItem(STORAGE_KEYS.userHasVisitedApp, 'False'))();
  // }, []);
  return (
    <ScreenWrapper>
      <CreateAccountLogoBox>
        <StyledLogo
          source={require('../../../assets/images/kolony-logo.png')}
        />
      </CreateAccountLogoBox>
      <CreateAccountOptionsBox>
        <Button
          type={BUTTON_TYPES.primary}
          text="Create Account"
          fill
          onPress={() =>
            navigation.navigate(AUTHENTICATION_ROUTES.SIGN_UP_FORM)
          }
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
        <HorizontalWrapper>
          <FormFooterText>Already have an account?</FormFooterText>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(AUTHENTICATION_ROUTES.LOGIN_FORM)
            }>
            <Link> Login</Link>
          </TouchableOpacity>
        </HorizontalWrapper>
      </CreateAccountOptionsBox>
    </ScreenWrapper>
  );
};

export default CreateAcctOptions;
