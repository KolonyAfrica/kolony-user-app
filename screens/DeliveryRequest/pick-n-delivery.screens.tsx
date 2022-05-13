import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DeliveryFlow, MARGIN_SIZES} from '../../components/shared';
import {
  CenteredTitle,
  FlexItemView,
  HorizontalWrapper,
  ScreenWrapper,
  SubScreenTitle,
} from '../../components/shared/common/styles';
import GoBack from '../../components/shared/GoBack';
import Spacing from '../../components/shared/Spacing';
import {deliveryRequestTitles} from './data';

const PickUpAndDelivery = () => {
  return (
    <ScreenWrapper>
      <SafeAreaView>
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
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default PickUpAndDelivery;
