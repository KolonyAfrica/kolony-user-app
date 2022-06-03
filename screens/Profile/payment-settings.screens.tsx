import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {
  CenteredHeaderTitle,
  Icon,
  ICON_NAME,
  MARGIN_SIZES,
  Spacing,
} from '../../components/shared';
import {
  PushToEnd,
  ScreenWrapper,
  StyledText,
} from '../../components/shared/common/styles';
import {PaymentModeItem} from './styles';

const PaymentSettings = () => {
  const theme = useTheme();
  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <CenteredHeaderTitle
          title="Payment Methods"
          addBackText={false}
          mode="primary"
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.big} />
        <PaymentModeItem>
          <Icon name={ICON_NAME.money} />
          <Spacing size={MARGIN_SIZES.small} />
          <StyledText
            fontSize={theme.fontSizes.body}
            fontWeight={500}
            fontFamily={theme.fontTypes.body}
            color={theme.palette.tertiary.grey320}>
            Cash
          </StyledText>
          <PushToEnd pos="right" />
          <Icon name={ICON_NAME.tickCircle} />
        </PaymentModeItem>
        <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
        <PaymentModeItem>
          <Icon
            name={ICON_NAME.creditCard}
            color={theme.palette.tertiary.grey320}
            size={24}
          />
          <Spacing size={MARGIN_SIZES.small} />
          <StyledText
            fontSize={theme.fontSizes.body}
            fontWeight={500}
            fontFamily={theme.fontTypes.body}
            color={theme.palette.tertiary.grey320}>
            Use card **** 1827
          </StyledText>
          <PushToEnd pos="right" />
          <Icon name={ICON_NAME.tickCircle} />
        </PaymentModeItem>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default PaymentSettings;
