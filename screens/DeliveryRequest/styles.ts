import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {SCREEN_WIDTH} from '../../components/shared/common/constants';

/**Contact search styles */
export const CancelText = styled.Text`
  font-weight: 400;
  font-size: ${({theme}) => `${theme.fontSizes.small}px`};
  line-height: ${({theme}) => `${theme.lineHeight.small}px`};
  color: ${({theme}) => theme.palette.primary.blue};
  font-family: ${({theme}) => theme.fontTypes.body};
`;

export const ContactEmptyHeader = styled.Text`
  font-size: ${({theme}) => `${theme.fontSizes.small}px`};
  line-height: ${({theme}) => `${theme.lineHeight.small}px`};
  color: ${({theme}) => theme.palette.tertiary.grey320};
  padding-left: ${({theme}) => `${theme.margin.medium}px`};
  font-family: ${({theme}) => theme.fontTypes.body};
`;

export const SearchResultHeader = styled.Text`
  font-family: ${({theme}) => theme.fontTypes.body};
  font-size: ${({theme}) => `${theme.fontSizes.body}px`};
  line-height: ${({theme}) => `${theme.lineHeight.body}px`};
  font-weight: 700;
`;

export const SearchResult = styled.TouchableOpacity`
  border-bottom-width: ${`${StyleSheet.hairlineWidth}px`};
  border-color: ${({theme}) => theme.palette.tertiary.grey230};
  margin-bottom: 18px;
  width: ${`${SCREEN_WIDTH - 48}px`};
  padding-bottom: ${({theme}) => `${theme.padding.small}px`};
`;

export const ResultMainText = styled.Text`
  font-family: ${({theme}) => theme.fontTypes.body};
  font-size: ${({theme}) => `${theme.fontSizes.small}px`};
  line-height: ${({theme}) => `${theme.lineHeight.small}px`};
  font-weight: 400;
  color: ${({theme}) => theme.palette.primary.blue900};
`;

export const ResultSubText = styled.Text`
  font-size: ${({theme}) => `${theme.fontSizes.tiny}px`};
  line-height: ${({theme}) => `${theme.lineHeight.tiny}px`};
  color: ${({theme}) => theme.palette.tertiary.grey310};
`;

/** Item Delivery */
export const ItemCategoryBox = styled.View`
  height: 44px;
  width: 100%;
  border-radius: ${({theme}) => `${theme.borderRadii.sm}px`};
  border: ${({theme}) => `1px solid ${theme.palette.tertiary.grey310}`};
  padding: 12px 16px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ItemCategoryText = styled.Text<{selected: boolean}>`
  font-family: ${({theme}) => theme.fontTypes.body};
  font-size: ${({theme}) => `${theme.fontSizes.small}px`};
  line-height: ${({theme}) => `${theme.lineHeight.small}px`};
  font-weight: 400;
  color: ${({theme, selected}) =>
    selected ? '#000000' : theme.palette.tertiary.grey310};
`;

export const ImagePickerBox = styled.TouchableOpacity`
  width: 100%;
  height: 44px;
  background-color: ${({theme}) => theme.palette.secondary.orange160};
  border-radius: ${({theme}) => `${theme.borderRadii.sm}px`};
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

export const ImageIconBox = styled.View`
  height: 44px;
  width: 44px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.palette.primary.blue};
  border-bottom-left-radius: ${({theme}) => `${theme.borderRadii.sm}px`};
  border-top-left-radius: ${({theme}) => `${theme.borderRadii.sm}px`};
`;

export const ImagePickerText = styled.Text`
  font-family: ${({theme}) => theme.fontTypes.body};
  font-size: ${({theme}) => `${theme.fontSizes.small}px`};
  line-height: ${({theme}) => `${theme.lineHeight.small}px`};
  font-weight: 400;
  color: ${({theme}) => theme.palette.tertiary.grey320};
  padding-left: ${({theme}) => `${theme.padding.medium}px`};
`;

/**Select pickup Type */
export const SelectBox = styled.TouchableOpacity<{selected: boolean}>`
  width: 156px;
  height: 109px;
  background-color: ${({theme}) => theme.palette.secondary.orange160};
  padding: 10px 13px;
  border-radius: ${({theme}) => `${theme.borderRadii.lg}px`};
  justify-content: space-between;
  border: ${({theme, selected}) =>
    `1px solid ${
      selected
        ? theme.palette.secondary.orange
        : theme.palette.secondary.orange160
    }`};
`;

export const SelectBoxText = styled.Text`
  font-weight: 500;
  font-size: ${({theme}) => `${theme.fontSizes.small}px`};
  line-height: ${({theme}) => `${theme.lineHeight.small}px`};
`;

/**  Delivery Summary styles */
export const SummaryCardHeaderText = styled.Text<{
  light?: boolean;
  medium?: boolean;
}>`
  font-family: ${({theme}) => theme.fontTypes.body};
  font-size: ${({theme}) => `${theme.fontSizes.small}px`};
  line-height: ${({theme}) => `${theme.lineHeight.small}px`};
  font-weight: ${({light, medium}) => (light ? '400' : medium ? '500' : '700')};
  color: ${({theme}) => theme.palette.primary.blue900};
`;

export const SummaryCardDescription = styled.Text`
  font-family: ${({theme}) => theme.fontTypes.body};
  font-size: ${({theme}) => `${theme.fontSizes.tiny}px`};
  line-height: ${({theme}) => `${theme.lineHeight.tiny}px`};
  font-weight: 400;
  color: ${({theme}) => theme.palette.tertiary.grey320};
  width: 70%;
  padding-top: ${({theme}) => `${theme.padding.tiny}px`};
`;

export const SummaryCardIconBox = styled.View<{small?: boolean}>`
  width: ${({small}) => (small ? '30px' : '40px')};
  height: ${({small}) => (small ? '30px' : '40px')};
  border-radius: ${({small}) => (small ? '30px' : '40px')};
  background-color: ${({theme}) => theme.palette.primary.blue100};
  justify-content: center;
  align-items: center;
`;
