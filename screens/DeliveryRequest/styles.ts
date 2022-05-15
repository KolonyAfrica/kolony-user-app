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
