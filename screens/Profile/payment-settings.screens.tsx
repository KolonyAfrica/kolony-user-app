import React from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {Paystack} from 'react-native-paystack-webview';
import {PAYSTACK_PUBLIC_KEY} from '@env';
import {
  CenteredHeaderTitle,
  CenteredModal,
  Icon,
  ICON_NAME,
  MARGIN_SIZES,
  Spacing,
} from '../../components/shared';
import {
  HorizontalWrapper,
  PushToEnd,
  ScreenWrapper,
  StyledText,
} from '../../components/shared/common/styles';
import {PaymentModeItem} from './styles';

interface CardType {
  last4: string;
  id: string;
}

const PaymentSettings = () => {
  const [cards, setCards] = React.useState<CardType[]>([]);
  const [addCardSuccessModal, setAddCardSuccessModal] =
    React.useState<boolean>(false);
  const paystackWebViewRef = React.useRef<any>();
  const theme = useTheme();
  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <CenteredModal
        visible={addCardSuccessModal}
        onRequestClose={() => {
          setAddCardSuccessModal(false);
        }}
        content={{
          title: 'Well done!',
          msg: 'You have added card ****4081 to your account',
          btnActionName: 'Go Back',
        }}
      />
      <Paystack
        paystackKey={PAYSTACK_PUBLIC_KEY}
        amount={'50.00'}
        billingEmail="chkyko@yahoo.com"
        activityIndicatorColor={theme.palette.primary.blue}
        ref={paystackWebViewRef}
        onCancel={() => {
          // handle response here
        }}
        onSuccess={() => {
          setAddCardSuccessModal(true);
          setCards([{last4: '4081', id: '1'}]);
        }}
      />
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
        {!cards.length ? (
          <PaymentModeItem
            onPress={() => paystackWebViewRef.current.startTransaction()}>
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
              Add debit/credit card
            </StyledText>
            <PushToEnd pos="right" />
            <Icon
              name={ICON_NAME.arrow}
              direction="right"
              color={theme.palette.tertiary.grey320}
            />
          </PaymentModeItem>
        ) : (
          cards.map((card, index) => (
            <PaymentModeItem key={card.id + index}>
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
                Use card **** {card.last4}
              </StyledText>
              <PushToEnd pos="right" />
              <Icon name={ICON_NAME.tickCircle} />
            </PaymentModeItem>
          ))
        )}

        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        {cards.length ? (
          <TouchableOpacity
            onPress={() => paystackWebViewRef.current.startTransaction()}>
            <HorizontalWrapper fill justify="center">
              <Icon name={ICON_NAME.cardAdd} />
              <Spacing size={MARGIN_SIZES.small} />
              <StyledText
                fontSize={theme.fontSizes.body}
                fontWeight={500}
                lineHeight={21}
                color={theme.palette.tertiary.grey320}>
                Add new card
              </StyledText>
            </HorizontalWrapper>
          </TouchableOpacity>
        ) : null}
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default PaymentSettings;
