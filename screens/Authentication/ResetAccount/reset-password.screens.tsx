import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BaseTextInput,
  Button,
  BUTTON_TYPES,
  CenteredModal,
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

const ResetPassword = () => {
  const [modalVisible, setModalVisibility] = React.useState<boolean>(false);
  return (
    <ScreenWrapper>
      <CenteredModal
        visible={modalVisible}
        onRequestClose={() => setModalVisibility(false)}
        content={{
          title: 'Congratulations!',
          msg: 'Your password has been reset successfully',
          btnActionName: 'Back to Login',
        }}
      />
      <SafeAreaView>
        <GoBack />
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <ScreenTitle>Reset Password</ScreenTitle>
        <Spacing direction="vertical" />
        <FormFooterText>
          Enter a new password for your account. Make sure it is a strong and
          memorable password!
        </FormFooterText>
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <BaseTextInput
          label="New Password"
          placeholder="Enter new password"
          secureTextEntry
          autoFocus
          mode={INPUT_MODES.default}
          helperText="Must contain upper case and lower case letters, and numbers."
          fill
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <BaseTextInput
          label="Confirm Password"
          placeholder="Confirm new password"
          secureTextEntry
          autoFocus
          mode={INPUT_MODES.default}
          fill
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <Button
          type={BUTTON_TYPES.primary}
          text="Submit"
          fill
          onPress={() => setModalVisibility(true)}
        />
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default ResetPassword;
