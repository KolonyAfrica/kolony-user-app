import styled from 'styled-components/native';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../../components/shared/common/constants';
import {
  FormFooterText,
  generalHorizontalPadding,
  ScreenTitle,
  Touchable,
} from '../../components/shared/common/styles';

export const HomeWrapper = styled.View`
  flex: 1;
`;

export const HomeIntroBox = styled.View`
  background-color: ${({theme}) => theme.palette.primary.blue800};
  width: ${`${SCREEN_WIDTH}px`};
  height: ${`${SCREEN_HEIGHT * 0.27}px`};
  padding: ${({
    theme: {
      padding: {big, large},
    },
  }) => `${large * 2.5}px ${big}px ${big}px ${big}px`};
`;

export const UserName = styled(ScreenTitle)`
  color: #ffffff;
`;

export const HomeDescText = styled(FormFooterText)`
  color: #ffffff;
`;
export const DeliveryOptionsBox = styled.View`
  padding: ${`${generalHorizontalPadding}px`};
  background-color: #ffffff;
`;

export const DeliveryOption = styled(Touchable)<{reduceMargin?: boolean}>`
  background-color: ${({theme}) => theme.palette.secondary.orange160};
  width: 100%;
  height: 80px;
  border-radius: ${({theme}) => `${theme.borderRadii.lg}px`};
  padding: ${({theme}) => `0px ${theme.padding.medium}px`};
  justify-content: center;
  margin-bottom: ${({reduceMargin}) => (reduceMargin ? '10px' : '20px')};
`;

export const DeliveryOptionHeading = styled.Text`
  font-size: ${({theme}) => `${theme.fontSizes.body}px`};
  line-height: ${({theme}) => `${theme.lineHeight.body}px`};
  color: ${({theme}) => theme.palette.tertiary.grey440};
  font-family: ${({theme}) => theme.fontTypes.body};
  font-weight: 700;
`;

export const Description = styled(FormFooterText)`
  color: ${({theme}) => theme.palette.tertiary.grey320};
`;

export const LastActivityBox = styled.View`
  background-color: #ffffff;
  padding-left: ${`${generalHorizontalPadding}px`};
  flex: 1;
`;

export const LastActivityTitle = styled(ScreenTitle)`
  font-size: ${({theme}) => `${theme.fontSizes.h2}px`};
  line-height: ${({theme}) => `${theme.lineHeight.h2}px`};
`;

export const LastActivityItem = styled.View`
  background-color: ${({theme}) => theme.palette.secondary.orange160};
  border-radius: ${({theme}) => `${theme.borderRadii.lg}px`};
  height: 140px;
  width: 140px;
  padding: 10px 15px 10px 10px;
  justify-content: space-between;
`;

export const LastActivityItemHeader = styled.Text`
  font-size: ${({theme}) => `${theme.fontSizes.small}px`};
  line-height: ${({theme}) => `${theme.lineHeight.small}px`};
  color: ${({theme}) => theme.palette.primary.blue900};
  font-family: ${({theme}) => theme.fontTypes.body};
  font-weight: 500;
  margin-bottom: ${({theme}) => `${theme.padding.tiny}px`};
`;

export const LastActivityItemDescription = styled(Description)`
  font-size: ${({theme}) => `${theme.fontSizes.tiny}px`};
  line-height: ${({theme}) => `${theme.lineHeight.tiny}px`};
`;

export const LastActivityItemDateText = styled.Text`
  font-size: ${({theme}) => `${theme.fontSizes.tiny}px`};
  line-height: ${({theme}) => `${theme.lineHeight.tiny}px`};
  color: ${({theme}) => theme.palette.tertiary.grey310};
  font-family: ${({theme}) => theme.fontTypes.body};
  font-weight: 400;
  margin-left: ${({theme}) => `${theme.padding.tiny + 1}px`};
`;
