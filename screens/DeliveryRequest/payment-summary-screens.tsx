import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CenteredHeaderTitle,
  DeliveryFlow,
  MARGIN_SIZES,
} from '../../components/shared';
import {
  ScreenWrapper,
  StyledScrollView,
  SubScreenTitle,
} from '../../components/shared/common/styles';
import Spacing from '../../components/shared/Spacing';
import {deliveryRequestTitles} from './data';

const PaymentSummary = () => {
  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <StyledScrollView showsVerticalScrollIndicator={false}>
          <CenteredHeaderTitle
            title="Single Delivery"
            addBackText={false}
            mode="primary"
          />
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
