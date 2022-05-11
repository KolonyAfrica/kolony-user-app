import React from 'react';
import {useTheme} from 'styled-components';
import {Icon, ICON_NAME, MARGIN_SIZES} from '../../../../components/shared';
import {
  HorizontalWrapper,
  VerticalWrapper,
} from '../../../../components/shared/common/styles';
import Spacing from '../../../../components/shared/Spacing';
import {
  CloseIconBox,
  ModalHeader,
  ModalHeaderDescription,
  ModalOptionDescription,
  ModalOptionTitle,
  VehicleOptionModal,
  VehicleTypeModalBox,
} from './styles';

const VehicleTypesModal = (props: any) => {
  const theme = useTheme();
  return (
    <VehicleTypeModalBox>
      <HorizontalWrapper align="flex-start" justify="space-between">
        <VerticalWrapper align="flex-start">
          <ModalHeader>Vehicle type</ModalHeader>
          <ModalHeaderDescription>
            Select a vehicle type that best meets with your needs.
          </ModalHeaderDescription>
        </VerticalWrapper>
        <CloseIconBox onPress={props.onRequestClose}>
          <Icon
            name={ICON_NAME.closeCircle}
            color={theme.palette.tertiary.grey430}
          />
        </CloseIconBox>
      </HorizontalWrapper>
      <Spacing direction="vertical" size={MARGIN_SIZES.small} />
      <VehicleOptionModal>
        <HorizontalWrapper align="flex-start" justify="space-between">
          <HorizontalWrapper>
            <Icon name={ICON_NAME.bike} />
            <Spacing size={MARGIN_SIZES.small} />
            <VerticalWrapper align="flex-start">
              <ModalOptionTitle>Motor Bike</ModalOptionTitle>
              <ModalOptionDescription>
                Ideal for lightweight items: documents
              </ModalOptionDescription>
            </VerticalWrapper>
          </HorizontalWrapper>
          <Icon name={ICON_NAME.infoCircle} />
        </HorizontalWrapper>
      </VehicleOptionModal>
      <Spacing direction="vertical" size={MARGIN_SIZES.small} />
      <VehicleOptionModal>
        <HorizontalWrapper align="flex-start" justify="space-between">
          <HorizontalWrapper>
            <Icon name={ICON_NAME.car} />
            <Spacing size={MARGIN_SIZES.small} />
            <VerticalWrapper align="flex-start">
              <ModalOptionTitle>Car</ModalOptionTitle>
              <ModalOptionDescription>
                Ideal for larger items: bag of clothes, shoes
              </ModalOptionDescription>
            </VerticalWrapper>
          </HorizontalWrapper>
          <Icon name={ICON_NAME.infoCircle} />
        </HorizontalWrapper>
      </VehicleOptionModal>
      <Spacing direction="vertical" size={MARGIN_SIZES.small} />
      <VehicleOptionModal>
        <HorizontalWrapper align="flex-start" justify="space-between">
          <HorizontalWrapper>
            <Icon name={ICON_NAME.miniVan} />
            <Spacing size={MARGIN_SIZES.small} />
            <VerticalWrapper align="flex-start">
              <ModalOptionTitle>Mini Van</ModalOptionTitle>
              <ModalOptionDescription>
                Ideal for big/bulky items: refrigerator, washing machine
              </ModalOptionDescription>
            </VerticalWrapper>
          </HorizontalWrapper>
          <Icon name={ICON_NAME.infoCircle} />
        </HorizontalWrapper>
      </VehicleOptionModal>
      <Spacing direction="vertical" size={MARGIN_SIZES.small} />
      <VehicleOptionModal>
        <HorizontalWrapper align="flex-start" justify="space-between">
          <HorizontalWrapper>
            <Icon name={ICON_NAME.truck} />
            <Spacing size={MARGIN_SIZES.small} />
            <VerticalWrapper align="flex-start">
              <ModalOptionTitle>Truck</ModalOptionTitle>
              <ModalOptionDescription>
                Ideal for moving large items: home or office furniture
              </ModalOptionDescription>
            </VerticalWrapper>
          </HorizontalWrapper>
          <Icon name={ICON_NAME.infoCircle} />
        </HorizontalWrapper>
      </VehicleOptionModal>
    </VehicleTypeModalBox>
  );
};

export default VehicleTypesModal;
