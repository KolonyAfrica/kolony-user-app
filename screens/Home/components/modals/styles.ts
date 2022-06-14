import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {SCREEN_WIDTH} from '../../../../components/shared/common/constants';

/** Layout styles */
export const VehicleTypeModalBox = styled.View`
  padding: 16px 15px 0px 15px;
`;

export const VehicleOptionModal = styled.View`
  width: 100%;
  height: 90px;
  background-color: ${({theme}) => theme.palette.secondary.orange160};
  border-radius: ${({theme}) => `${theme.borderRadii.lg}px`};
  padding: 12px;
  margin-bottom: ${({theme}) => `${theme.margin.medium}px`};
`;

export const CloseIconBox = styled(TouchableOpacity)`
  padding-right: 12px;
`;

/** Text styles */
export const ModalHeader = styled.Text`
  font-weight: 700;
  font-size: ${({theme}) => `${theme.fontSizes.h2}px`};
  line-height: ${({theme}) => `${theme.lineHeight.h2}px`};
  color: ${({theme}) => theme.palette.primary.blue900};
  margin-bottom: ${({theme}) => `${theme.margin.tiny}px`};
  font-family: ${({theme}) => theme.fontTypes.body};
`;

export const ModalHeaderDescription = styled.Text`
  font-weight: 400;
  font-size: ${({theme}) => `${theme.fontSizes.small}px`};
  line-height: ${({theme}) => `${theme.lineHeight.small}px`};
  color: ${({theme}) => theme.palette.tertiary.grey310};
  font-family: ${({theme}) => theme.fontTypes.body};
  width: ${`${(267 / SCREEN_WIDTH) * SCREEN_WIDTH}px`};
`;

export const ModalOptionTitle = styled.Text`
  font-weight: 700;
  font-size: ${({theme}) => `${theme.fontSizes.small}px`};
  line-height: ${({theme}) => `${theme.lineHeight.small}px`};
  color: ${({theme}) => theme.palette.tertiary.grey320};
  margin-bottom: ${({theme}) => `${theme.margin.tiny}px`};
  font-family: ${({theme}) => theme.fontTypes.body};
`;

export const ModalOptionDescription = styled.Text`
  font-weight: 400;
  font-size: ${({theme}) => `${theme.fontSizes.tiny}px`};
  line-height: ${({theme}) => `${theme.lineHeight.tiny}px`};
  color: ${({theme}) => theme.palette.tertiary.grey310};
  margin-bottom: ${({theme}) => `${theme.margin.tiny}px`};
  font-family: ${({theme}) => theme.fontTypes.body};
  width: ${`${(180 / SCREEN_WIDTH) * SCREEN_WIDTH}px`};
`;
