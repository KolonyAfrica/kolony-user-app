import styled from 'styled-components/native';
import {Animated, StyleSheet} from 'react-native';
import {sharedType} from '../../components/shared/common/styles';

export const NotificationBox = styled(Animated.View)`
  background-color: #ffffff;
  border-bottom-width: ${`${StyleSheet.hairlineWidth}px`}
  border-color: ${({theme}) => theme.palette.tertiary.grey200};
  padding: 10px;
  max-height: 68px;
  width: 100%;
`;

export const NotificationIconBox = styled.View<{screenType: sharedType}>`
  height: 48px;
  width: 48px;
  border-radius: 48px;
  justify-content: center;
  align-items: center;
  background-color: ${({screenType, theme}) =>
    screenType === 'primary'
      ? theme.palette.primary.blue100
      : theme.palette.secondary.orange100};
`;
