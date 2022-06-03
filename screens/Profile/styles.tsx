import styled from 'styled-components/native';
import {SCREEN_HEIGHT} from '../../components/shared/common/constants';
import {
  generalHorizontalPadding,
  statusBarHeight,
} from '../../components/shared/common/styles';

export const AccountWrapper = styled.View`
  flex: 1;
`;

export const AccountHeader = styled.View`
  width: 100%;
  height: ${`${(304 / SCREEN_HEIGHT) * SCREEN_HEIGHT}px`};
  background-color: ${({theme}) => theme.palette.primary.blue800};
  padding: ${`${
    statusBarHeight + 15
  }px ${generalHorizontalPadding}px 0px ${generalHorizontalPadding}px `};
`;

export const AccountBody = styled.View`
  width: 100%;
  height: auto;
`;

export const AccountSettingOption = styled.TouchableOpacity`
  margin-bottom: 30px;
`;

/** Account settings */

export const AccountSettingHeader = styled(AccountHeader)`
  height: ${`${(250 / SCREEN_HEIGHT) * SCREEN_HEIGHT}px`};
`;

export const AccountSettingBody = styled.View`
  padding: ${`0px ${generalHorizontalPadding}px`};
`;

export const ImagePickerBox = styled.TouchableOpacity`
  position: relative;
`;

export const ImagePickerIconBox = styled.View`
  position: absolute;
  bottom: -5px;
  right: -5px;
`;

/** Payment settings styles */
export const PaymentModeItem = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.palette.secondary.orange160};
  height: 56px;
  width: 100%;
  display: flex; 
  flex-direction:row;
  align-items:center
  border-radius: ${({theme}) => `${theme.borderRadii.sm}px`};
  padding: 0px 10px;
`;
