import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Button,
  BUTTON_TYPES,
  CenteredModal,
  MARGIN_SIZES,
} from '../../../components/shared';
import {
  FormFooterText,
  HorizontalWrapper,
  Link,
  ScreenTitle,
  ScreenWrapper,
  VerticalWrapper,
} from '../../../components/shared/common/styles';
import GoBack from '../../../components/shared/GoBack';
import {OTPInput, OTP_INPUT_MODES} from '../../../components/shared/Input';
import Spacing from '../../../components/shared/Spacing';
import {
  AUTHENTICATION_ROUTES,
  AuthStackParamList,
} from '../../../navigation/typing';

type NavigationProp = NativeStackScreenProps<
  AuthStackParamList,
  AUTHENTICATION_ROUTES.VERIFY_OTP_FORM
>;

const VerifyOTPForm = () => {
  const [modalVisible, setModalVisibility] = React.useState<boolean>(false);
  const route = useRoute<NavigationProp['route']>();
  const navigation = useNavigation<NavigationProp['navigation']>();

  const handleOTPVerification = () => {
    const origin = route.params?.origin;
    if (origin === 'new-account') {
      setModalVisibility(true);
    } else {
      navigation.navigate(AUTHENTICATION_ROUTES.RESET_PASSWORD_FORM);
    }
  };

  return (
    <ScreenWrapper>
      <CenteredModal
        visible={modalVisible}
        onRequestClose={() => setModalVisibility(false)}
        content={{
          title: 'Congratulations!',
          msg: 'Your account has been created successfully',
          btnActionName: 'Continue',
        }}
      />
      <SafeAreaView>
        <GoBack />
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <ScreenTitle>OTP Verification</ScreenTitle>
        <Spacing direction="vertical" />
        <FormFooterText>
          Kindly enter OTP sent to barney@gmail.com
        </FormFooterText>
        <Spacing direction="vertical" size={MARGIN_SIZES.big} />
        <OTPInput
          digits={4}
          mode={OTP_INPUT_MODES.primary}
          onChange={val => console.log('THIS IS THE OTP_VALUE', val)}
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.big} />
        <Button
          type={BUTTON_TYPES.primary}
          text="Continue"
          fill
          onPress={handleOTPVerification}
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <VerticalWrapper>
          <HorizontalWrapper>
            <FormFooterText>Did not receive OTP?</FormFooterText>
            <TouchableOpacity>
              <Link> Resend OTP</Link>
            </TouchableOpacity>
          </HorizontalWrapper>
        </VerticalWrapper>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default VerifyOTPForm;
