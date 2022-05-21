import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DeliveryFlow, MARGIN_SIZES} from '../../components/shared';
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
import {deliveryRequestTitles} from './data';

const PaymentSummary = () => {
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
          <DeliveryFlow titles={deliveryRequestTitles} customIndex={3} />
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <SubScreenTitle>Payment Summary</SubScreenTitle>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        </StyledScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default PaymentSummary;
