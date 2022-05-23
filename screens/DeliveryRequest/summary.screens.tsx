import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {
  Button,
  BUTTON_TYPES,
  CenteredHeaderTitle,
  CenteredModal,
  DateTimePicker,
  DeliveryFlow,
  Icon,
  ICON_NAME,
  MARGIN_SIZES,
} from '../../components/shared';
import {
  HorizontalWrapper,
  PushToEnd,
  ScreenWrapper,
  StyledScrollView,
  SubScreenTitle,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import Spacing from '../../components/shared/Spacing';
import {RootStackParamList, ROOT_ROUTES} from '../../navigation/typing';
import SummaryCard from './components/summary-card.components';
import {deliveryRequestTitles} from './data';
import EditItemDetailsModal from './modals/edit-item-details.modals';
import EditPaymentModal from './modals/edit-payment.modal';
import EditPickUpDetails from './modals/edit-pickup-details';
import EditReceiverDetails from './modals/edit-receiver-details';
import {
  SummaryCardDescription,
  SummaryCardHeaderText,
  SummaryCardIconBox,
} from './styles';

export enum SUMMARY_EDIT_MODAL {
  editPayment = 'editPayment',
  editPickupTime = 'editPickupTime',
  editItemDetails = 'editItemDetails',
  editPickupDetails = 'editPickupDetails',
  editReceiverDetails = 'editReceiverDetails',
}

export interface EditModalProps {
  onRequestClose: () => void;
}

const Modals = {
  editPayment: EditPaymentModal,
  editPickupTime: DateTimePicker,
  editItemDetails: EditItemDetailsModal,
  editReceiverDetails: EditReceiverDetails,
  editPickupDetails: EditPickUpDetails,
};

const SummaryEditModal: React.FC<
  {modal: SUMMARY_EDIT_MODAL | undefined} & EditModalProps
> = React.memo(({modal, ...otherProps}) => {
  if (!modal) {
    return null;
  }
  const SelectedModal = Modals[modal] as React.ElementType;
  return SelectedModal ? <SelectedModal {...otherProps} /> : null;
});

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  ROOT_ROUTES.SUMMARY
>;

const Summary = () => {
  const navigation = useNavigation<NavigationProps['navigation']>();
  const route = useRoute<NavigationProps['route']>();
  const [selectedEditModal, setSelectedEditModal] = React.useState<
    SUMMARY_EDIT_MODAL | undefined
  >();
  const theme = useTheme();

  const isPickupTimeModalSelected =
    selectedEditModal === SUMMARY_EDIT_MODAL.editPickupTime;

  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <CenteredModal
        visible={!!selectedEditModal && !isPickupTimeModalSelected}
        onRequestClose={() => setSelectedEditModal(undefined)}>
        <SummaryEditModal
          modal={selectedEditModal}
          onRequestClose={() => setSelectedEditModal(undefined)}
        />
      </CenteredModal>
      <DateTimePicker
        visible={isPickupTimeModalSelected}
        applySelectedSchedule={() => {}}
        onRequestClose={() => setSelectedEditModal(undefined)}
        btnActionName="Update"
      />
      <SafeAreaView>
        <StyledScrollView showsVerticalScrollIndicator={false}>
          <CenteredHeaderTitle
            title="Single Package"
            addBackText={false}
            mode="primary"
          />
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <DeliveryFlow titles={deliveryRequestTitles} customIndex={2} />
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <SubScreenTitle>Delivery Summary</SubScreenTitle>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <SummaryCard
            edit={() =>
              setSelectedEditModal(SUMMARY_EDIT_MODAL.editPickupDetails)
            }
            title="Pickup Details">
            <HorizontalWrapper align="flex-start" fill>
              <SummaryCardIconBox>
                <Icon
                  name={ICON_NAME.user}
                  color={theme.palette.primary.blue}
                />
              </SummaryCardIconBox>
              <Spacing size={MARGIN_SIZES.small} />
              <VerticalWrapper align="flex-start" justify="flex-start" fill>
                <SummaryCardHeaderText>
                  Emmanuel Olowookere
                </SummaryCardHeaderText>
                <SummaryCardDescription>
                  5A, Adeyemi Lawson, Ikoyi, Lagos Island, Lagos, Nigeria
                </SummaryCardDescription>
                <SummaryCardDescription>0900122423</SummaryCardDescription>
              </VerticalWrapper>
            </HorizontalWrapper>
          </SummaryCard>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <SummaryCard
            edit={() =>
              setSelectedEditModal(SUMMARY_EDIT_MODAL.editReceiverDetails)
            }
            title="Delivery Details">
            <HorizontalWrapper align="flex-start" fill>
              <SummaryCardIconBox>
                <Icon
                  name={ICON_NAME.user}
                  color={theme.palette.primary.blue}
                />
              </SummaryCardIconBox>
              <Spacing size={MARGIN_SIZES.small} />
              <VerticalWrapper align="flex-start" justify="flex-start" fill>
                <SummaryCardHeaderText>Stephanie Okafor</SummaryCardHeaderText>
                <SummaryCardDescription>
                  Unilag area, Yaba Lagos
                </SummaryCardDescription>
                <SummaryCardDescription>0806122423</SummaryCardDescription>
              </VerticalWrapper>
            </HorizontalWrapper>
          </SummaryCard>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <SummaryCard
            edit={() =>
              setSelectedEditModal(SUMMARY_EDIT_MODAL.editItemDetails)
            }
            title="Item (s) to be Delivered">
            <HorizontalWrapper align="flex-start" fill>
              <SummaryCardIconBox>
                <Icon
                  name={ICON_NAME.box}
                  size={24}
                  color={theme.palette.primary.blue}
                />
              </SummaryCardIconBox>
              <Spacing size={MARGIN_SIZES.small} />
              <VerticalWrapper align="flex-start" justify="flex-start" fill>
                <SummaryCardHeaderText>
                  Computers / Phones
                </SummaryCardHeaderText>
                <SummaryCardDescription>Black HP Laptop</SummaryCardDescription>
                <SummaryCardDescription>Quantity: 2</SummaryCardDescription>
                <SummaryCardDescription>Value: N250,000</SummaryCardDescription>
              </VerticalWrapper>
            </HorizontalWrapper>
          </SummaryCard>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <SummaryCard
            edit={() => setSelectedEditModal(SUMMARY_EDIT_MODAL.editPickupTime)}
            title="Pickup Time">
            <VerticalWrapper align="flex-start" justify="flex-start" fill>
              <SummaryCardHeaderText light>
                Scheduled Pickup
              </SummaryCardHeaderText>
              <Spacing direction="vertical" />
              <HorizontalWrapper>
                <SummaryCardIconBox small>
                  <Icon
                    name={ICON_NAME.clock}
                    color={theme.palette.primary.blue}
                    size={18.6}
                  />
                </SummaryCardIconBox>
                <Spacing />
                <SummaryCardDescription>10: 00 AM</SummaryCardDescription>
              </HorizontalWrapper>
              <Spacing direction="vertical" />
              <HorizontalWrapper>
                <SummaryCardIconBox small>
                  <Icon
                    name={ICON_NAME.calendar}
                    color={theme.palette.primary.blue}
                    size={18.6}
                  />
                </SummaryCardIconBox>
                <Spacing />
                <SummaryCardDescription>30th Nov, 2021</SummaryCardDescription>
              </HorizontalWrapper>
            </VerticalWrapper>
          </SummaryCard>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <SummaryCard
            edit={() => setSelectedEditModal(SUMMARY_EDIT_MODAL.editPayment)}
            title="Payment Method">
            <HorizontalWrapper fill>
              <SummaryCardIconBox small>
                <Icon
                  name={ICON_NAME.creditCard}
                  color={theme.palette.primary.blue}
                  size={18.6}
                />
              </SummaryCardIconBox>
              <Spacing size={MARGIN_SIZES.small} />
              <SummaryCardHeaderText light>Card Payment</SummaryCardHeaderText>
              <PushToEnd pos="right" />
              <SummaryCardHeaderText medium>N2500</SummaryCardHeaderText>
            </HorizontalWrapper>
            <Spacing direction="vertical" size={MARGIN_SIZES.tiny} />
            <SummaryCardDescription>
              Card: {'   **** **** **** 1224'}
            </SummaryCardDescription>
          </SummaryCard>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <Button
            type={BUTTON_TYPES.primary}
            text="Send Pickup Request"
            fill
            onPress={() =>
              navigation.navigate(ROOT_ROUTES.PAYMENT_SUMMARY, {
                ...route.params,
              })
            }
          />
        </StyledScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Summary;
