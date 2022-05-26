import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTheme} from 'styled-components/native';
import {
  BUTTON_TYPES,
  CenteredHeaderTitle,
  ICON_NAME,
  ListRadioSelector,
  MARGIN_SIZES,
  Spacing,
  Button,
  BaseTextInput,
  INPUT_MODES,
} from '../../components/shared';
import {
  ScreenWrapper,
  StyledScrollView,
  StyledText,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import {RootStackParamList, ROOT_ROUTES} from '../../navigation/typing';
import {RadioItem} from '../../components/shared/ListRadioSelector';

const possibleCancelReasons = [
  {label: 'Wrong delivery location', value: 'Wrong delivery location'},
  {label: 'Rider looks suspicious', value: 'Rider looks suspicious'},
  {label: 'Long pickup/arrival time', value: 'Long pickup/arrival time'},
  {label: 'I cannot locate the rider', value: 'I cannot locate the rider'},
  {label: 'Other', value: 'Other'},
];

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  ROOT_ROUTES.CANCEL_DELIVERY
>;

const CancelDeliveryReason = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps['navigation']>();
  const route = useRoute<NavigationProps['route']>();
  const [showTextArea, setShowTextArea] = React.useState<boolean>(false);

  const handleCancelReasonSelection = React.useCallback(
    (selected: RadioItem) => {
      if (selected.value === possibleCancelReasons.slice(-1)[0].label) {
        setShowTextArea(true);
      } else {
        setShowTextArea(false);
      }
    },
    [],
  );

  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <StyledScrollView showsVerticalScrollIndicator={false}>
          <CenteredHeaderTitle
            title="Cancel Delivery"
            addBackText={false}
            mode="primary"
            iconName={ICON_NAME.closeCircle}
          />
          <Spacing direction="vertical" size={MARGIN_SIZES.large} />
          <VerticalWrapper fill>
            <StyledText
              fontWeight={700}
              fontSize={theme.fontSizes.h2}
              color={theme.palette.primary.blue900}
              textAlign="center">
              Confirm Delivery Cancellation
            </StyledText>
            <Spacing direction="vertical" />
            <StyledText
              fontWeight={400}
              fontSize={theme.fontSizes.small}
              color={theme.palette.tertiary.grey320}
              textAlign="center">
              Kindly state your reason for cancellation
            </StyledText>
          </VerticalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.large} />
          <ListRadioSelector
            items={possibleCancelReasons}
            onSelect={handleCancelReasonSelection}
          />
          {showTextArea ? (
            <BaseTextInput
              placeholder="Type here..."
              mode={INPUT_MODES.default}
              multiline
              borderColor={theme.palette.tertiary.grey430}
              numberOfLines={3}
              fill
            />
          ) : null}
          <Spacing
            direction="vertical"
            size={showTextArea ? MARGIN_SIZES.small : MARGIN_SIZES.medium}
          />
          <Button
            type={BUTTON_TYPES.primary}
            text="Cancel Delivery"
            onPress={() =>
              navigation.navigate(ROOT_ROUTES.PAYMENT_SUMMARY, {
                progress: 3,
                multiple: route.params?.multiple,
              })
            }
            fill
          />
        </StyledScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default CancelDeliveryReason;
