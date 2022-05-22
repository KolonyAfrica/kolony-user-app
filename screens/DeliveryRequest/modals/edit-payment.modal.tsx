import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components/native';
import {
  Button,
  BUTTON_SIZE,
  BUTTON_TYPES,
  Icon,
  ICON_NAME,
  ListRadioSelector,
  MARGIN_SIZES,
} from '../../../components/shared';
import {
  HorizontalWrapper,
  VerticalWrapper,
} from '../../../components/shared/common/styles';
import Spacing from '../../../components/shared/Spacing';
import {ModalHeaderDescription} from '../../Home/components/modals/styles';
import {ModalTitle} from '../styles';
import {EditModalProps} from '../summary.screens';

const paymentOptions = [
  {label: 'Card Payment', value: 'Card Payment'},
  {
    label: 'Cash on Delivery',
    value: 'Cash on Delivery',
  },
];

const EditPaymentModal: React.FC<EditModalProps> = ({onRequestClose}) => {
  const theme = useTheme();
  return (
    <VerticalWrapper fill justify="flex-start" align="flex-start">
      <HorizontalWrapper fill justify="space-between">
        <ModalTitle>Edit Payment Method</ModalTitle>
        <TouchableOpacity onPress={onRequestClose}>
          <Icon
            name={ICON_NAME.closeCircle}
            size={23}
            color={theme.palette.tertiary.grey310}
          />
        </TouchableOpacity>
      </HorizontalWrapper>
      <Spacing direction="vertical" size={MARGIN_SIZES.small} />
      <ModalHeaderDescription>
        Kindly edit your payment method
      </ModalHeaderDescription>
      <Spacing direction="vertical" size={MARGIN_SIZES.small} />
      <ListRadioSelector items={paymentOptions} onSelect={() => {}} />
      <Spacing direction="vertical" size={MARGIN_SIZES.small} />
      <HorizontalWrapper>
        <Button
          text="Cancel"
          type={BUTTON_TYPES.primaryALT}
          size={BUTTON_SIZE.small}
        />
        <Spacing size={MARGIN_SIZES.small} />
        <Button
          text="Confirm"
          type={BUTTON_TYPES.primary}
          size={BUTTON_SIZE.small}
        />
      </HorizontalWrapper>
    </VerticalWrapper>
  );
};

export default EditPaymentModal;
