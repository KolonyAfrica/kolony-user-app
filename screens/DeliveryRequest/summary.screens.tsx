import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {
  Button,
  BUTTON_TYPES,
  CenteredModal,
  DeliveryFlow,
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
import SummaryCard from './components/summary-card.components';
import {deliveryRequestTitles} from './data';
import EditItemDetailsModal from './modals/edit-item-details.modals';
import EditPaymentModal from './modals/edit-payment.modal';
import EditPickUpDetails from './modals/edit-pickup-details';
import EditPickupTimeModal from './modals/edit-pickup-time.modal';
import EditReceiverDetails from './modals/edit-receiver-details';

export enum SUMMARY_EDIT_MODAL {
  editPayment = 'editPayment',
  editPickupTime = 'editPickupTime',
  editItemDetails = 'editItemDetails',
  editPickupDetails = 'editPickupDetails',
  editReceiverDetails = 'editReceiverDetails',
}

const Modals = {
  editPayment: EditPaymentModal,
  editPickupTime: EditPickupTimeModal,
  editItemDetails: EditItemDetailsModal,
  editReceiverDetails: EditReceiverDetails,
  editPickupDetails: EditPickUpDetails,
};

const SummaryEditModal: React.FC<{modal: SUMMARY_EDIT_MODAL | undefined}> =
  React.memo(({modal, ...otherProps}) => {
    if (!modal) {
      return null;
    }
    const SelectedModal = Modals[modal] as React.ElementType;
    return SelectedModal ? <SelectedModal {...otherProps} /> : null;
  });

const Summary = () => {
  const [selectedEditModal, setSelectedEditModal] = React.useState<
    SUMMARY_EDIT_MODAL | undefined
  >();

  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <CenteredModal
        visible={!!selectedEditModal}
        onRequestClose={() => setSelectedEditModal(undefined)}>
        <SummaryEditModal modal={selectedEditModal} />
      </CenteredModal>
      <SafeAreaView>
        <StyledScrollView showsVerticalScrollIndicator={false}>
          <HorizontalWrapper>
            <GoBack showText={false} mode="primary" />
            <FlexItemView>
              <HorizontalWrapper justify="center">
                <CenteredTitle>Send a Package</CenteredTitle>
              </HorizontalWrapper>
            </FlexItemView>
          </HorizontalWrapper>
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
            <></>
          </SummaryCard>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <SummaryCard
            edit={() =>
              setSelectedEditModal(SUMMARY_EDIT_MODAL.editReceiverDetails)
            }
            title="Delivery Details">
            <></>
          </SummaryCard>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <SummaryCard
            edit={() =>
              setSelectedEditModal(SUMMARY_EDIT_MODAL.editItemDetails)
            }
            title="Item (s) to be Delivered">
            <></>
          </SummaryCard>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <SummaryCard
            edit={() => setSelectedEditModal(SUMMARY_EDIT_MODAL.editPickupTime)}
            title="Pickup Time">
            <></>
          </SummaryCard>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <SummaryCard
            edit={() => setSelectedEditModal(SUMMARY_EDIT_MODAL.editPayment)}
            title="Payment Method">
            <></>
          </SummaryCard>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <Button type={BUTTON_TYPES.primary} text="Send Pickup Request" fill />
        </StyledScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Summary;
