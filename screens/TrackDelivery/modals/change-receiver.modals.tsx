import React from 'react';
import {useTheme} from 'styled-components/native';
import {
  BaseTextInput,
  Button,
  BUTTON_SIZE,
  BUTTON_TYPES,
  Icon,
  ICON_NAME,
  INPUT_MODES,
  LocationInput,
  MARGIN_SIZES,
  Spacing,
} from '../../../components/shared';
import {
  FlexItemView,
  HorizontalWrapper,
  ScreenWrapper,
  StyledText,
} from '../../../components/shared/common/styles';

const ChangeReceiverModal: React.FC<{
  onConfirm: () => void;
  onRequestClose: () => void;
}> = (props: any) => {
  const theme = useTheme();
  return (
    <ScreenWrapper>
      <StyledText
        color={theme.palette.primary.blue900}
        fontSize={theme.fontSizes.body}
        fontWeight={700}
        marginTop={20}>
        Change Receiver
      </StyledText>
      <StyledText
        color="rgba(21, 25, 32, 0.5)"
        fontSize={theme.fontSizes.small}
        fontWeight={400}
        marginBottom={29}>
        You have opted to delegate your delivery. Kindly enter your receiver
        details.
      </StyledText>
      <BaseTextInput
        placeholder="Ibikunle"
        autoFocus
        returnKeyLabel="next"
        returnKeyType="next"
        mode={INPUT_MODES.default}
        marginBottom={MARGIN_SIZES.small}
        leftIcon={({textColor}) => (
          <Icon name={ICON_NAME.user} size={18} color={textColor} />
        )}
        fill
      />
      <BaseTextInput
        placeholder="0707332211"
        returnKeyLabel="next"
        returnKeyType="next"
        mode={INPUT_MODES.default}
        marginBottom={MARGIN_SIZES.small}
        leftIcon={({textColor}) => (
          <Icon name={ICON_NAME.call} size={18} color={textColor} />
        )}
        fill
      />
      <LocationInput
        placeholder="Jibowu Yaba"
        iconSize={20}
        inputLeftIcon={ICON_NAME.locationPointer}
        onSelection={address =>
          console.log('Address', JSON.stringify(address, null, 2))
        }
      />
      <HorizontalWrapper fill marginTop={20} marginBottom={20}>
        <FlexItemView>
          <Button
            size={BUTTON_SIZE.small}
            type={BUTTON_TYPES.primaryALT}
            text="Cancel"
            fill
            onPress={props.onRequestClose}
          />
        </FlexItemView>
        <Spacing size={MARGIN_SIZES.small} />
        <FlexItemView>
          <Button
            size={BUTTON_SIZE.small}
            type={BUTTON_TYPES.primary}
            text="Confirm"
            onPress={props.onConfirm}
            fill
          />
        </FlexItemView>
      </HorizontalWrapper>
    </ScreenWrapper>
  );
};

export default ChangeReceiverModal;
