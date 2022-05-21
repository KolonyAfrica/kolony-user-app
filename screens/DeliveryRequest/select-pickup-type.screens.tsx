import {StatusBar} from 'react-native';
import React from 'react';
import {
  CenteredTitle,
  FlexItemView,
  HorizontalWrapper,
  ScreenWrapper,
  StyledScrollView,
  SubScreenTitle,
} from '../../components/shared/common/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import GoBack from '../../components/shared/GoBack';
import Spacing from '../../components/shared/Spacing';
import {
  Button,
  BUTTON_TYPES,
  CenteredModal,
  DeliveryFlow,
  Icon,
  ICON_NAME,
  MARGIN_SIZES,
} from '../../components/shared';
import {deliveryRequestTitles} from './data';
import {RootStackParamList, ROOT_ROUTES} from '../../navigation/typing';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SelectBox, SelectBoxText} from './styles';
import SchedulePickupModal from './modals/schedule-pickup.modal';

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  ROOT_ROUTES.SELECT_PICKUP_TYPE
>;

type PickupTypes = 'instant' | 'scheduled';

const SelectPickup = () => {
  const navigation = useNavigation<NavigationProps['navigation']>();
  const route = useRoute<NavigationProps['route']>();
  const [selectedType, setSelectedType] =
    React.useState<PickupTypes>('instant');
  const [showDateTimePickerModal, setShowDateTimePickerModal] =
    React.useState<boolean>(false);
  const [showSuccessPickerModal, setShowSuccessPickerModal] =
    React.useState<boolean>(false);

  const isSelected = (type: PickupTypes) => selectedType === type;

  /** select pickup type */
  const handleSchedulePickupSelection = React.useCallback(() => {
    setSelectedType('scheduled');
    setShowDateTimePickerModal(true);
  }, []);

  const applySelectedSchedule = () => {
    setShowDateTimePickerModal(false);
    setShowSuccessPickerModal(true);
  };

  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <SchedulePickupModal
        visible={showDateTimePickerModal}
        applySelectedSchedule={applySelectedSchedule}
        onRequestClose={() => setShowDateTimePickerModal(false)}
      />
      <CenteredModal
        visible={showSuccessPickerModal}
        onRequestClose={() => {
          setShowSuccessPickerModal(false);
          navigation.navigate(ROOT_ROUTES.SUMMARY, {
            ...route.params,
          });
        }}
        content={{
          title: 'Well done!',
          msg: 'Pickup time has been set',
          btnActionName: 'Continue',
        }}
      />
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
          <DeliveryFlow titles={deliveryRequestTitles} customIndex={1} />
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <SubScreenTitle>Select Pickup Type</SubScreenTitle>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          <HorizontalWrapper justify="space-between">
            <SelectBox
              selected={isSelected('instant')}
              onPress={() => setSelectedType('instant')}>
              <Icon
                name={ICON_NAME.instantPickup}
                invert={isSelected('instant')}
              />
              <SelectBoxText>Instant Pickup</SelectBoxText>
            </SelectBox>
            <SelectBox
              selected={selectedType === 'scheduled'}
              onPress={handleSchedulePickupSelection}>
              <Icon
                name={ICON_NAME.circleCalendar}
                invert={isSelected('scheduled')}
              />
              <SelectBoxText>Scheduled Pickup</SelectBoxText>
            </SelectBox>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <Button
            type={BUTTON_TYPES.primary}
            text="Preview"
            fill
            onPress={() =>
              navigation.navigate(ROOT_ROUTES.SUMMARY, {
                ...route.params,
              })
            }
          />
        </StyledScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default SelectPickup;
