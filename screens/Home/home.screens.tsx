import React from 'react';
import {FlatList, StatusBar} from 'react-native';
import {useTheme} from 'styled-components';
import {
  BaseTextInput,
  BottomModal,
  BOTTOM_MODAL_SIZE,
  Button,
  BUTTON_SIZE,
  BUTTON_TYPES,
  Icon,
  ICON_NAME,
  INPUT_MODES,
  MARGIN_SIZES,
} from '../../components/shared';
import {
  FlexItemView,
  HorizontalWrapper,
  StyledScrollView,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import Spacing from '../../components/shared/Spacing';
import VehicleTypesModal from './components/modals/vehicle-types.modal';
import {recentActivities} from './data';
import {
  DeliveryOption,
  Description,
  DeliveryOptionHeading,
  DeliveryOptionsBox,
  HomeDescText,
  HomeIntroBox,
  HomeWrapper,
  LastActivityBox,
  ProfileImage,
  UserName,
  LastActivityTitle,
  LastActivityItem,
  LastActivityItemHeader,
  LastActivityItemDateText,
  LastActivityItemDescription,
} from './styles';

export type DeliveryType = 'multiple' | 'single' | undefined;

const Home = () => {
  const theme = useTheme();
  const [showVehicleTypesModal, setShowVehicleTypesModal] =
    React.useState<boolean>(false);
  const [chosenDeliveryType, setChosenDeliveryType] =
    React.useState<DeliveryType>();

  /** handle delivery type selection and control opening and closing modal */
  const chooseDeliveryType = React.useCallback((deliveryType: DeliveryType) => {
    return () => {
      if (deliveryType) {
        setChosenDeliveryType(deliveryType);
        setShowVehicleTypesModal(true);
      }
    };
  }, []);

  return (
    <HomeWrapper>
      <StatusBar barStyle="light-content" />
      <BottomModal
        visible={showVehicleTypesModal}
        onRequestClose={() => setShowVehicleTypesModal(false)}
        size={BOTTOM_MODAL_SIZE.medium}>
        <VehicleTypesModal deliveryType={chosenDeliveryType} />
      </BottomModal>
      <StyledScrollView showsVerticalScrollIndicator={false}>
        <HomeIntroBox>
          <HorizontalWrapper justify="space-between">
            <VerticalWrapper align="flex-start">
              <UserName>Hello, Daniel</UserName>
              <Spacing direction="vertical" />
              <HomeDescText>This is your Kolony, make orders!</HomeDescText>
            </VerticalWrapper>
            <ProfileImage
              source={require('../../assets/images/profile.jpeg')}
            />
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          <HorizontalWrapper justify="space-between">
            <FlexItemView flex={2}>
              <BaseTextInput
                placeholder="Enter tracking ID"
                autoFocus
                autoCorrect={false}
                autoCapitalize="none"
                mode={INPUT_MODES.default}
                fill
              />
            </FlexItemView>
            <Spacing size={MARGIN_SIZES.small} />
            <FlexItemView>
              <Button
                type={BUTTON_TYPES.primary}
                text="Track"
                fill
                size={BUTTON_SIZE.medium}
              />
            </FlexItemView>
          </HorizontalWrapper>
        </HomeIntroBox>
        <DeliveryOptionsBox>
          <DeliveryOption onPress={chooseDeliveryType('single')}>
            <HorizontalWrapper justify="space-between">
              <HorizontalWrapper>
                <Icon name={ICON_NAME.singleDelivery} />
                <Spacing size={MARGIN_SIZES.small} />
                <VerticalWrapper align="flex-start">
                  <DeliveryOptionHeading>Single Delivery</DeliveryOptionHeading>
                  <Description>Request for pickup</Description>
                </VerticalWrapper>
              </HorizontalWrapper>
              <Icon
                name={ICON_NAME.arrow}
                direction="right"
                color={theme.palette.tertiary.grey410}
              />
            </HorizontalWrapper>
          </DeliveryOption>
          <DeliveryOption onPress={chooseDeliveryType('multiple')}>
            <HorizontalWrapper justify="space-between">
              <HorizontalWrapper>
                <Icon name={ICON_NAME.multipleDelivery} />
                <Spacing size={MARGIN_SIZES.small} />
                <VerticalWrapper align="flex-start">
                  <DeliveryOptionHeading>
                    Multiple Delivery
                  </DeliveryOptionHeading>
                  <Description>Request for multiple pickup</Description>
                </VerticalWrapper>
              </HorizontalWrapper>
              <Icon
                name={ICON_NAME.arrow}
                direction="right"
                color={theme.palette.tertiary.grey410}
              />
            </HorizontalWrapper>
          </DeliveryOption>
          <DeliveryOption reduceMargin>
            <HorizontalWrapper justify="space-between">
              <HorizontalWrapper>
                <Icon name={ICON_NAME.tracking} />
                <Spacing size={MARGIN_SIZES.small} />
                <VerticalWrapper align="flex-start">
                  <DeliveryOptionHeading>Tracking</DeliveryOptionHeading>
                  <Description>Track your product in real-time</Description>
                </VerticalWrapper>
              </HorizontalWrapper>
              <Icon
                name={ICON_NAME.arrow}
                direction="right"
                color={theme.palette.tertiary.grey410}
              />
            </HorizontalWrapper>
          </DeliveryOption>
        </DeliveryOptionsBox>
        <LastActivityBox>
          <LastActivityTitle>Last Activity</LastActivityTitle>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          <FlatList
            data={recentActivities}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <>
                <LastActivityItem>
                  <VerticalWrapper align="flex-start">
                    <LastActivityItemHeader>
                      {item.title}
                    </LastActivityItemHeader>
                    <HorizontalWrapper>
                      <Icon name={ICON_NAME.clock} />
                      <LastActivityItemDateText>
                        {item.date}
                      </LastActivityItemDateText>
                    </HorizontalWrapper>
                  </VerticalWrapper>
                  <VerticalWrapper align="flex-start">
                    <LastActivityItemDescription>
                      {item.deliveryType}
                    </LastActivityItemDescription>
                    <LastActivityItemDescription>
                      {item.description}
                    </LastActivityItemDescription>
                  </VerticalWrapper>
                </LastActivityItem>
                <Spacing size={MARGIN_SIZES.small} />
              </>
            )}
            keyExtractor={item => item.id}
          />
          <Spacing direction="vertical" />
        </LastActivityBox>
      </StyledScrollView>
    </HomeWrapper>
  );
};

export default Home;
