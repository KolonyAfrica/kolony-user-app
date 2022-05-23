import React from 'react';
import {useTheme} from 'styled-components/native';
import {
  Button,
  BUTTON_TYPES,
  MARGIN_SIZES,
  Spacing,
} from '../../../components/shared';
import {SCREEN_WIDTH} from '../../../components/shared/common/constants';
import {
  FlexItemView,
  HorizontalWrapper,
  ScreenWrapper,
  StyledText,
  VerticalWrapper,
} from '../../../components/shared/common/styles';

const PaymentConfirmationModal: React.FC<{
  onConfirm: () => void;
  onRequestClose: () => void;
}> = props => {
  const theme = useTheme();
  return (
    <ScreenWrapper>
      <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
      <VerticalWrapper>
        <StyledText
          fontSize={theme.fontSizes.small}
          fontWeight={500}
          width={SCREEN_WIDTH * 0.7}
          textAlign="center"
          color={theme.palette.tertiary.grey320}>
          Would you like to proceed with your delivery?
        </StyledText>
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <HorizontalWrapper>
          <FlexItemView>
            <Button
              type={BUTTON_TYPES.primaryALT}
              text="Go Back"
              fill
              onPress={props.onRequestClose}
            />
          </FlexItemView>
          <Spacing size={MARGIN_SIZES.small} />
          <FlexItemView>
            <Button type={BUTTON_TYPES.primary} text="Proceed" fill />
          </FlexItemView>
        </HorizontalWrapper>
      </VerticalWrapper>
    </ScreenWrapper>
  );
};

export default PaymentConfirmationModal;
