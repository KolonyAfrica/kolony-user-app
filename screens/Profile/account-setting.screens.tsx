import React from 'react';
import {StatusBar} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useTheme} from 'styled-components/native';
import {
  BaseTextInput,
  Button,
  BUTTON_TYPES,
  CenteredHeaderTitle,
  Icon,
  ICON_NAME,
  INPUT_MODES,
  MARGIN_SIZES,
  Spacing,
} from '../../components/shared';
import {
  ProfileImage,
  StyledScrollView,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import {
  AccountSettingBody,
  AccountSettingHeader,
  AccountWrapper,
  ImagePickerBox,
  ImagePickerIconBox,
} from './styles';

const AccountSetting = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const handleProfileImageSelection = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    console.log('result', result);
  };

  const handleEditAndUpdate = () => {
    setIsEditing(e => !e);
  };

  const inputBgColor = isEditing
    ? theme.palette.white
    : theme.palette.secondary.orange160;

  const inputBorderColor = isEditing
    ? theme.palette.tertiary.grey410
    : theme.palette.secondary.orange160;

  return (
    <AccountWrapper>
      <StatusBar barStyle="light-content" />
      <StyledScrollView showsVerticalScrollIndicator={false}>
        <AccountSettingHeader>
          <CenteredHeaderTitle
            title="Account Settings"
            addBackText={false}
            mode="overlay"
            moveTitleLeftBy={20}
          />
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <VerticalWrapper fill>
            <ImagePickerBox onPress={handleProfileImageSelection}>
              <ProfileImage
                source={require('../../assets/images/profile.jpeg')}
                size={100}
              />
              <ImagePickerIconBox>
                <Icon name={ICON_NAME.imagePicker} />
              </ImagePickerIconBox>
            </ImagePickerBox>
          </VerticalWrapper>
        </AccountSettingHeader>
        <AccountSettingBody>
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          <BaseTextInput
            label="Full Name"
            placeholder="Ibikunle Shuaib"
            autoFocus
            returnKeyLabel="next"
            returnKeyType="next"
            mode={INPUT_MODES.default}
            bgColor={inputBgColor}
            borderColor={inputBorderColor}
            editable={isEditing}
            fill
          />
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          <BaseTextInput
            label="Email Address"
            placeholder="!ibikunleShuaib@gmail.com"
            returnKeyLabel="next"
            returnKeyType="next"
            mode={INPUT_MODES.default}
            bgColor={inputBgColor}
            borderColor={inputBorderColor}
            editable={isEditing}
            fill
          />
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          <BaseTextInput
            label="Phone Number"
            placeholder="09154689255"
            returnKeyLabel="next"
            returnKeyType="next"
            mode={INPUT_MODES.default}
            bgColor={inputBgColor}
            borderColor={inputBorderColor}
            editable={isEditing}
            fill
          />
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          <BaseTextInput
            label="Home Address"
            placeholder="
            Uniport Road, Owhipa Chopa, Choba, Port Harcourt, Rivers."
            returnKeyLabel="next"
            returnKeyType="next"
            mode={INPUT_MODES.default}
            bgColor={inputBgColor}
            borderColor={inputBorderColor}
            editable={isEditing}
            fill
          />
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <Button
            text={isEditing ? 'Update Profile' : 'Edit Profile'}
            type={BUTTON_TYPES.primary}
            fill
            onPress={handleEditAndUpdate}
          />
        </AccountSettingBody>
      </StyledScrollView>
    </AccountWrapper>
  );
};

export default AccountSetting;
