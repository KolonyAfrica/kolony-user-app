import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BaseTextInput,
  Button,
  BUTTON_TYPES,
  CenteredHeaderTitle,
  INPUT_MODES,
  MARGIN_SIZES,
  Spacing,
} from '../../components/shared';
import {ScreenWrapper} from '../../components/shared/common/styles';

const PasswordSetting = () => {
  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <CenteredHeaderTitle
          title="Password Settings"
          addBackText={false}
          mode="primary"
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.big} />
        <BaseTextInput
          label="Old Password"
          placeholder=""
          autoFocus
          secureTextEntry
          returnKeyLabel="next"
          returnKeyType="next"
          mode={INPUT_MODES.default}
          fill
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        <BaseTextInput
          label="New Password"
          placeholder=""
          autoFocus
          secureTextEntry
          returnKeyLabel="next"
          returnKeyType="next"
          mode={INPUT_MODES.default}
          fill
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        <BaseTextInput
          label="Confirm Password"
          placeholder=""
          autoFocus
          secureTextEntry
          returnKeyLabel="next"
          returnKeyType="next"
          mode={INPUT_MODES.default}
          fill
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <Button text="Update Password" type={BUTTON_TYPES.primary} fill />
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default PasswordSetting;
