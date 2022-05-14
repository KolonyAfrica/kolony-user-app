import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
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
import {vehicleTypes} from '../../data';
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

export enum tooltipsInfoTypes {
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

  return (
    <VehicleTypeModalBox>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        {vehicleTypes.map((vehicle, index) => (
          <TouchableWithoutFeedback
            key={vehicle.title}
            onPress={navigateToDeliveryForm}>
            <VehicleOptionModal>
              <HorizontalWrapper align="flex-start" justify="space-between">
                <HorizontalWrapper>
                  <Icon name={vehicle.icon} />
                  <Spacing size={MARGIN_SIZES.small} />
                  <VerticalWrapper align="flex-start">
                    <ModalOptionTitle>{vehicle.title}</ModalOptionTitle>
                    <ModalOptionDescription>
                      {vehicle.description}
                    </ModalOptionDescription>
                  </VerticalWrapper>
                </HorizontalWrapper>
                <Tooltip
                  title={vehicle.tooltip.title}
                  content={vehicle.tooltip.description}
                  visible={isInfoModalVisible(vehicle.tooltip.ctrlId)}
                  placement={
                    index === vehicleTypes.length - 1 ? 'top' : 'bottom'
                  }
                  onRequestClose={infoTooltipHandler()}>
                  <TouchableOpacity
                    onPress={infoTooltipHandler(vehicle.tooltip.ctrlId)}>
                    <Icon name={ICON_NAME.infoCircle} />
                  </TouchableOpacity>
                </Tooltip>
              </HorizontalWrapper>
            </VehicleOptionModal>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </VehicleTypeModalBox>
  );
};

export default VehicleTypesModal;
