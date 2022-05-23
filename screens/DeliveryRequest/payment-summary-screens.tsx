import React from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled, {useTheme} from 'styled-components/native';
import {
  BaseTextInput,
  BottomModal,
  BOTTOM_MODAL_SIZE,
  CenteredHeaderTitle,
  DeliveryFlow,
  Icon,
  ICON_NAME,
  INPUT_MODES,
  MARGIN_SIZES,
} from '../../components/shared';
import {
  FlexItemView,
  HorizontalWrapper,
  ScreenWrapper,
  StyledScrollView,
  StyledText,
  SubScreenTitle,
} from '../../components/shared/common/styles';
import Spacing from '../../components/shared/Spacing';
import {deliveryRequestTitles} from './data';
import PaymentConfirmationModal from './modals/payment-confirmation.modal';

/** styles */
const RadioBox = styled.View`
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: #ffffff;
  border: ${({theme}) => `1px solid ${theme.palette.primary.blue}`};
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Radio = styled.View<{selected: boolean}>`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  border: ${({theme, selected}) =>
    `2px solid ${!selected ? '#ffffff' : theme.palette.primary.blue}`};
`;

const RadioButton = styled.TouchableOpacity<{selected: boolean}>`
  background-color: ${({theme, selected}) =>
    selected ? theme.palette.primary.blue : theme.palette.primary.blue100};
  border-radius: ${({theme}) => `${theme.borderRadii.md}px`};
  flex-direction: row;
  height: 61px;
  width: 100%;
  align-items: center;
  padding: 20px;
`;

enum PAYMENT_OPTIONS {
  card,
  cashOnPickup,
  cashOnDelivery,
}

const PaymentSummary = () => {
  const theme = useTheme();
  const [chosenPaymentOption, setChosenPaymentOption] = React.useState<
    PAYMENT_OPTIONS | undefined
  >();
  const [showConfirmationModal, setConfirmationModalVisibility] =
    React.useState<boolean>(false);

  const selectedPaymentOptions = {
    card: chosenPaymentOption === PAYMENT_OPTIONS.card,
    cashOnPickup: chosenPaymentOption === PAYMENT_OPTIONS.cashOnPickup,
    cashOnDelivery: chosenPaymentOption === PAYMENT_OPTIONS.cashOnDelivery,
  };

  const handlePaymentModeSelection = React.useCallback(
    (mode: PAYMENT_OPTIONS) => {
      let confirmModalId: ReturnType<typeof setTimeout>;
      return () => {
        setChosenPaymentOption(mode);
        if (confirmModalId) {
          clearTimeout(confirmModalId);
        } else {
          confirmModalId = setTimeout(() => {
            setConfirmationModalVisibility(true);
          }, 300);
        }
      };
    },
    [],
  );

  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <BottomModal
        visible={showConfirmationModal}
        onRequestClose={() => setConfirmationModalVisibility(false)}
        size={BOTTOM_MODAL_SIZE.small}>
        <PaymentConfirmationModal
          onConfirm={() => {}}
          onRequestClose={() => setConfirmationModalVisibility(false)}
        />
      </BottomModal>
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
          <HorizontalWrapper justify="space-between" fill>
            <StyledText
              fontSize={theme.fontSizes.small}
              fontWeight={400}
              color={theme.palette.tertiary.grey310}>
              Subtotal
            </StyledText>
            <StyledText
              fontSize={theme.fontSizes.small}
              fontWeight={500}
              color={theme.palette.tertiary.grey320}>
              N2000
            </StyledText>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          <HorizontalWrapper justify="space-between" fill>
            <StyledText
              fontSize={theme.fontSizes.small}
              fontWeight={400}
              color={theme.palette.tertiary.grey310}>
              Service Charge
            </StyledText>
            <StyledText
              fontSize={theme.fontSizes.small}
              fontWeight={500}
              color={theme.palette.tertiary.grey320}>
              N500
            </StyledText>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <HorizontalWrapper justify="space-between" fill>
            <StyledText
              fontSize={theme.fontSizes.small}
              fontWeight={500}
              color={theme.palette.tertiary.grey320}>
              Total
            </StyledText>
            <StyledText
              fontSize={theme.fontSizes.small}
              fontWeight={500}
              color={theme.palette.tertiary.grey320}>
              N2500
            </StyledText>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <HorizontalWrapper justify="space-between" fill>
            <FlexItemView flex={3}>
              <BaseTextInput
                placeholder="Promo Code"
                mode={INPUT_MODES.default}
                fill
                leftIcon={() => <Icon name={ICON_NAME.couponBadge} />}
                borderColor="transparent"
                bgColor={theme.palette.tertiary.grey220}
              />
            </FlexItemView>
            <FlexItemView>
              <HorizontalWrapper fill justify="flex-end">
                <TouchableOpacity>
                  <StyledText
                    fontSize={theme.fontSizes.small}
                    fontWeight={500}
                    color={theme.palette.primary.blue}>
                    Apply
                  </StyledText>
                </TouchableOpacity>
              </HorizontalWrapper>
            </FlexItemView>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <SubScreenTitle>Select Payment Method</SubScreenTitle>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          <RadioButton
            selected={selectedPaymentOptions.card}
            onPress={handlePaymentModeSelection(PAYMENT_OPTIONS.card)}>
            <RadioBox>
              <Radio selected={selectedPaymentOptions.card} />
            </RadioBox>
            <Icon
              name={ICON_NAME.masterCard}
              color={
                selectedPaymentOptions.card
                  ? '#ffffff'
                  : theme.palette.primary.blue
              }
            />
            <Spacing size={MARGIN_SIZES.small} />
            <StyledText
              fontSize={theme.fontSizes.body}
              fontWeight={500}
              lineHeight={21}
              color={
                selectedPaymentOptions.card
                  ? '#ffffff'
                  : theme.palette.primary.blue
              }>
              Use card **** 1827
            </StyledText>
          </RadioButton>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <RadioButton
            selected={selectedPaymentOptions.cashOnPickup}
            onPress={handlePaymentModeSelection(PAYMENT_OPTIONS.cashOnPickup)}>
            <RadioBox>
              <Radio selected={selectedPaymentOptions.cashOnPickup} />
            </RadioBox>
            <StyledText
              fontSize={theme.fontSizes.body}
              fontWeight={500}
              lineHeight={21}
              color={
                selectedPaymentOptions.cashOnPickup
                  ? '#ffffff'
                  : theme.palette.primary.blue
              }>
              Cash on Pickup
            </StyledText>
          </RadioButton>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <RadioButton
            selected={selectedPaymentOptions.cashOnDelivery}
            onPress={handlePaymentModeSelection(
              PAYMENT_OPTIONS.cashOnDelivery,
            )}>
            <RadioBox>
              <Radio selected={selectedPaymentOptions.cashOnDelivery} />
            </RadioBox>
            <StyledText
              fontSize={theme.fontSizes.body}
              fontWeight={500}
              lineHeight={21}
              color={
                selectedPaymentOptions.cashOnDelivery
                  ? '#ffffff'
                  : theme.palette.primary.blue
              }>
              Cash on Delivery
            </StyledText>
          </RadioButton>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
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
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        </StyledScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default PaymentSummary;
