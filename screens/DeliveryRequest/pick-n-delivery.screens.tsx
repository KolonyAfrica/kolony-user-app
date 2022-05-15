import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {
  BaseTextInput,
  Button,
  BUTTON_TYPES,
  DeliveryFlow,
  Icon,
  ICON_NAME,
  INPUT_MODES,
  LocationInput,
  MARGIN_SIZES,
} from '../../components/shared';
import {
  CenteredTitle,
  FlexItemView,
  HorizontalWrapper,
  ScreenWrapper,
  StyledScrollView,
  SubScreenTitle,
} from '../../components/shared/common/styles';
import GoBack from '../../components/shared/GoBack';
import Spacing from '../../components/shared/Spacing';
import {RootStackParamList, ROOT_ROUTES} from '../../navigation/typing';
import {deliveryRequestTitles} from './data';

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  ROOT_ROUTES.CONTACT_SEARCH
>;

const PickUpAndDelivery = () => {
  const route = useRoute<NavigationProps['route']>();
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps['navigation']>();
  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <StyledScrollView showsVerticalScrollIndicator={false}>
          <HorizontalWrapper>
            <GoBack showText={false} mode="primary" />
            <FlexItemView>
              <HorizontalWrapper justify="center">
                <CenteredTitle>Single Delivery</CenteredTitle>
              </HorizontalWrapper>
            </FlexItemView>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <DeliveryFlow titles={deliveryRequestTitles} />
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <SubScreenTitle>Pickup and Delivery</SubScreenTitle>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          <BaseTextInput
            placeholder="Search by name, phone, email..."
            mode={INPUT_MODES.disabled}
            leftIcon={() => <Icon name={ICON_NAME.search} />}
            bgColor={theme.palette.secondary.orange160}
            borderColor="transparent"
            marginBottom={MARGIN_SIZES.medium}
            fill
            onFocus={() =>
              navigation.navigate(ROOT_ROUTES.CONTACT_SEARCH, {
                multiple: route.params.multiple ?? false,
                progress: 0,
              })
            }
          />

          <LocationInput
            label="Pickup Address"
            placeholder="Current location"
            onSelection={address =>
              console.log('Address', JSON.stringify(address, null, 2))
            }
          />
          <LocationInput
            label="Delivery Address"
            placeholder="Enter Delivery Location"
            onSelection={address =>
              console.log('Address', JSON.stringify(address, null, 2))
            }
          />
          <BaseTextInput
            label="Receiver’s Full Name"
            placeholder="Enter name"
            mode={INPUT_MODES.default}
            leftIcon={({textColor}) => (
              <Icon name={ICON_NAME.user} size={18} color={textColor} />
            )}
            marginBottom={MARGIN_SIZES.small2}
            fill
          />
          <BaseTextInput
            label="Receiver’s Phone Number"
            placeholder="+234000111222"
            mode={INPUT_MODES.default}
            leftIcon={({textColor}) => (
              <Icon name={ICON_NAME.call} size={18} color={textColor} />
            )}
            marginBottom={MARGIN_SIZES.small2}
            fill
          />
          <BaseTextInput
            label="Receiver’s Email (Optional)"
            placeholder="Enter email address"
            mode={INPUT_MODES.default}
            leftIcon={({textColor}) => (
              <Icon name={ICON_NAME.sms} size={18} color={textColor} />
            )}
            fill
          />
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <Button type={BUTTON_TYPES.primary} text="Next" fill />
        </StyledScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default PickUpAndDelivery;
