import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from 'styled-components';
import {
  Icon,
  ICON_NAME,
  MARGIN_SIZES,
  Tooltip,
} from '../../../../components/shared';
import {
  HorizontalWrapper,
  VerticalWrapper,
} from '../../../../components/shared/common/styles';
import Spacing from '../../../../components/shared/Spacing';
import {
  MainTabStackParamList,
  RootStackParamList,
  ROOT_ROUTES,
} from '../../../../navigation/typing';
import {DeliveryType} from '../../home.screens';
import {
  CloseIconBox,
  ModalHeader,
  ModalHeaderDescription,
  ModalOptionDescription,
  ModalOptionTitle,
  VehicleOptionModal,
  VehicleTypeModalBox,
} from './styles';

enum tooltipsInfoTypes {
  bike = 'bike',
  car = 'car',
  miniVan = 'mini-van',
  truck = 'truck',
}

type HomeNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabStackParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

interface ModalProps {
  deliveryType: DeliveryType;
}

const VehicleTypesModal: React.FC<ModalProps & any> = ({
  deliveryType,
  onRequestClose,
}) => {
  const navigation = useNavigation<HomeNavigationProps['navigation']>();
  const theme = useTheme();
  const [currentInfoTooltip, setCurrentInfoTooltip] = React.useState<
    tooltipsInfoTypes | undefined
  >();

  /**
   * Controls opening and closing all info tooltips
   * @params infoType
   */
  const infoTooltipHandler = React.useCallback(
    (infoType?: tooltipsInfoTypes) => {
      return () => {
        setCurrentInfoTooltip(infoType);
      };
    },
    [],
  );

  /**
   * Checks passed infoType matches the current modal
   * @params infoType
   * @returns boolean
   */
  const isInfoModalVisible = React.useCallback(
    infoType => infoType === currentInfoTooltip,
    [currentInfoTooltip],
  );

  /** navigate to start of the order request form */
  const navigateToDeliveryForm = React.useCallback(() => {
    //close modal
    onRequestClose();
    return navigation.navigate(ROOT_ROUTES.PICKUP_AND_DELIVERY, {
      multiple: deliveryType === 'multiple',
      progress: 0,
    });
  }, [deliveryType, navigation, onRequestClose]);

  //Todo refactor vehicle types to use one array
  return (
    <VehicleTypeModalBox>
      <HorizontalWrapper align="flex-start" justify="space-between">
        <VerticalWrapper align="flex-start">
          <ModalHeader>Vehicle type</ModalHeader>
          <ModalHeaderDescription>
            Select a vehicle type that best meets with your needs.
          </ModalHeaderDescription>
        </VerticalWrapper>
        <CloseIconBox onPress={onRequestClose}>
          <Icon
            name={ICON_NAME.closeCircle}
            color={theme.palette.tertiary.grey430}
          />
        </CloseIconBox>
      </HorizontalWrapper>
      <Spacing direction="vertical" size={MARGIN_SIZES.small} />
      <TouchableWithoutFeedback onPress={navigateToDeliveryForm}>
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
            <Tooltip
              title="Motorbike"
              content="Ideal for lightweight items such as documents, food, clothing items and smaller household appliances."
              visible={isInfoModalVisible(tooltipsInfoTypes.bike)}
              onRequestClose={infoTooltipHandler()}>
              <TouchableOpacity
                onPress={infoTooltipHandler(tooltipsInfoTypes.bike)}>
                <Icon name={ICON_NAME.infoCircle} />
              </TouchableOpacity>
            </Tooltip>
          </HorizontalWrapper>
        </VehicleOptionModal>
      </TouchableWithoutFeedback>
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
          <Tooltip
            title="Car"
            content="Ideal for larger items: bag of clothes, shoes"
            visible={isInfoModalVisible(tooltipsInfoTypes.car)}
            onRequestClose={infoTooltipHandler()}>
            <TouchableOpacity
              onPress={infoTooltipHandler(tooltipsInfoTypes.car)}>
              <Icon name={ICON_NAME.infoCircle} />
            </TouchableOpacity>
          </Tooltip>
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
          <Tooltip
            title="Mini Van"
            content="Ideal for big/bulky items: refrigerator, washing machine"
            visible={isInfoModalVisible(tooltipsInfoTypes.miniVan)}
            onRequestClose={infoTooltipHandler()}>
            <TouchableOpacity
              onPress={infoTooltipHandler(tooltipsInfoTypes.miniVan)}>
              <Icon name={ICON_NAME.infoCircle} />
            </TouchableOpacity>
          </Tooltip>
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
          <Tooltip
            title="Truck"
            content="Ideal for moving large items: home or office furniture"
            visible={isInfoModalVisible(tooltipsInfoTypes.truck)}
            placement="top"
            onRequestClose={infoTooltipHandler()}>
            <TouchableOpacity
              onPress={infoTooltipHandler(tooltipsInfoTypes.truck)}>
              <Icon name={ICON_NAME.infoCircle} />
            </TouchableOpacity>
          </Tooltip>
        </HorizontalWrapper>
      </VehicleOptionModal>
    </VehicleTypeModalBox>
  );
};

export default VehicleTypesModal;
