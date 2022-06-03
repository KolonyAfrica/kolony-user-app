import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from 'styled-components/native';
import {
  CenteredHeaderTitle,
  Icon,
  ICON_NAME,
  MARGIN_SIZES,
  Spacing,
} from '../../components/shared';
import {
  HorizontalWrapper,
  IconBox,
  ProfileImage,
  PushToEnd,
  StyledScrollView,
  StyledText,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import utils from '../../components/shared/common/utils';
import {
  AUTHENTICATION_ROUTES,
  AuthStackParamList,
  MainTabStackParamList,
  RootStackParamList,
  ROOT_ROUTES,
} from '../../navigation/typing';
import {
  AccountBody,
  AccountHeader,
  AccountSettingOption,
  AccountWrapper,
} from './styles';

enum SETTING_OPTIONS {
  accountSetting = 'Account Settings',
  paymentSetting = 'Payment',
  notificationSetting = 'Notification Settings',
  passwordSetting = 'Password Settings',
  helpAndSupport = 'Help & Support',
  rateUs = 'Rate Us',
}

const settingOptionsIcons = {
  [SETTING_OPTIONS.accountSetting]: ICON_NAME.user,
  [SETTING_OPTIONS.paymentSetting]: ICON_NAME.creditCard,
  [SETTING_OPTIONS.notificationSetting]: ICON_NAME.notification,
  [SETTING_OPTIONS.passwordSetting]: ICON_NAME.lock,
  [SETTING_OPTIONS.helpAndSupport]: ICON_NAME.help,
  [SETTING_OPTIONS.rateUs]: ICON_NAME.star,
};

const settingsRoutes = {
  [SETTING_OPTIONS.accountSetting]: ROOT_ROUTES.ACCOUNT_SETTINGS,
  [SETTING_OPTIONS.paymentSetting]: ROOT_ROUTES.PAYMENT_SETTINGS,
  [SETTING_OPTIONS.notificationSetting]: ROOT_ROUTES.NOTIFICATION_SETTINGS,
  [SETTING_OPTIONS.passwordSetting]: ROOT_ROUTES.PASSWORD_SETTINGS,
  [SETTING_OPTIONS.helpAndSupport]: 'external*https://www.kolony.africa',
  [SETTING_OPTIONS.rateUs]: 'external*https://play.google.com/store/apps',
};

type ProfileNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabStackParamList, 'Account'>,
  CompositeScreenProps<
    NativeStackScreenProps<RootStackParamList>,
    NativeStackScreenProps<AuthStackParamList>
  >
>;

const Profile = () => {
  const navigation = useNavigation<ProfileNavigationProps['navigation']>();

  const theme = useTheme();

  const iconColors = React.useRef({
    primary: {
      color: theme.palette.primary.blue,
      bgColor: theme.palette.primary.blue100,
    },
    danger: {
      color: theme.palette.error,
      bgColor: theme.palette.error100,
    },
  }).current;

  const handleProfileSettingNavigation = (route: ROOT_ROUTES | string) => {
    if (route.startsWith('external')) {
      const [, url] = route.split('*');
      utils.openExternalLink(url);
    } else {
      navigation.navigate(route as ROOT_ROUTES);
    }
  };

  return (
    <AccountWrapper>
      <StatusBar barStyle="light-content" />
      <StyledScrollView showsVerticalScrollIndicator={false}>
        <AccountHeader>
          <CenteredHeaderTitle
            title="Account"
            addBackText={false}
            mode="overlay"
            moveTitleLeftBy={20}
          />
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          <VerticalWrapper fill>
            <ProfileImage
              source={require('../../assets/images/profile.jpeg')}
              size={100}
            />
            <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
            <StyledText
              fontSize={theme.fontSizes.h2}
              color={theme.palette.white}
              fontWeight={700}
              marginBottom={theme.margin.tiny}
              fontFamily={theme.fontTypes.body}>
              Arausi Daniel
            </StyledText>
            <StyledText
              fontSize={theme.fontSizes.tiny}
              color={'rgba(255, 255, 255, 0.6)'}
              fontWeight={400}
              marginBottom={theme.margin.tiny}
              fontFamily={theme.fontTypes.body}>
              Adaniel324@gmail.com
            </StyledText>
          </VerticalWrapper>
        </AccountHeader>
        <AccountBody>
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          {Object.entries(settingOptionsIcons).map(([key, val]) => (
            <AccountSettingOption
              key={key}
              onPress={() =>
                handleProfileSettingNavigation(
                  settingsRoutes[key as SETTING_OPTIONS],
                )
              }>
              <HorizontalWrapper fill>
                <Spacing size={MARGIN_SIZES.small2} />
                <IconBox bgColor={iconColors.primary.bgColor}>
                  <Icon name={val} color={iconColors.primary.color} size={24} />
                </IconBox>
                <Spacing size={MARGIN_SIZES.small} />
                <StyledText
                  fontSize={theme.fontSizes.small}
                  color={theme.palette.tertiary.grey320}
                  fontWeight={500}
                  marginBottom={theme.margin.tiny}
                  fontFamily={theme.fontTypes.body}>
                  {key}
                </StyledText>
                <PushToEnd pos="right" />
                <Icon
                  name={ICON_NAME.arrow}
                  direction="right"
                  color={iconColors.primary.color}
                />
                <Spacing size={MARGIN_SIZES.small2} />
              </HorizontalWrapper>
            </AccountSettingOption>
          ))}
          <AccountSettingOption
            onPress={() =>
              navigation.navigate(AUTHENTICATION_ROUTES.LOGIN_FORM)
            }>
            <HorizontalWrapper fill>
              <Spacing size={MARGIN_SIZES.small2} />
              <IconBox bgColor={iconColors.danger.bgColor}>
                <Icon
                  name={ICON_NAME.signOut}
                  color={iconColors.danger.color}
                  size={24}
                />
              </IconBox>
              <Spacing size={MARGIN_SIZES.small} />
              <StyledText
                fontSize={theme.fontSizes.small}
                color={theme.palette.tertiary.grey320}
                fontWeight={500}
                marginBottom={theme.margin.tiny}
                fontFamily={theme.fontTypes.body}>
                Logout
              </StyledText>
            </HorizontalWrapper>
          </AccountSettingOption>
        </AccountBody>
      </StyledScrollView>
    </AccountWrapper>
  );
};

export default Profile;
