import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components/native';
import {
  BaseTextInput,
  Button,
  BUTTON_SIZE,
  BUTTON_TYPES,
  Icon,
  ICON_NAME,
  INPUT_MODES,
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

const EditItemDetailsModal: React.FC<EditModalProps> = ({onRequestClose}) => {
  const theme = useTheme();
  return (
    <VerticalWrapper fill justify="flex-start" align="flex-start">
      <HorizontalWrapper fill justify="space-between">
        <ModalTitle>Edit Item (s) Details</ModalTitle>
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
        Kindly edit your item details
      </ModalHeaderDescription>
      <Spacing direction="vertical" size={MARGIN_SIZES.small} />
      <BaseTextInput
        placeholder="Laptop (Black)"
        autoFocus
        mode={INPUT_MODES.default}
        leftIcon={({textColor}) => (
          <Icon name={ICON_NAME.box} color={textColor} size={18} />
        )}
        fill
      />
      <Spacing direction="vertical" />
      <BaseTextInput
        placeholder="2"
        autoFocus
        mode={INPUT_MODES.default}
        leftIcon={({textColor}) => (
          <Icon name={ICON_NAME.boxAdd} color={textColor} size={18} />
        )}
        fill
      />
      <Spacing direction="vertical" />
      <BaseTextInput
        placeholder="07070712341"
        autoFocus
        mode={INPUT_MODES.default}
        leftIcon={({textColor}) => (
          <Icon name={ICON_NAME.tag} color={textColor} size={18} />
        )}
        fill
      />
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

export default EditItemDetailsModal;
