/** Track Delivery */

import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../../components/shared/common/constants';
import {generalHorizontalPadding} from '../../components/shared/common/styles';
import {MAP_HEIGHT} from './track-delivery.screens';

const bottomBoxHeight = (147 / SCREEN_HEIGHT) * SCREEN_HEIGHT;

export const MapViewBox = styled.View`
  width: 100%;
  height: ${`${MAP_HEIGHT}px`};
  border-radius: ${({theme}) => `${theme.borderRadii.lg}px`};
  overflow: hidden;
  position: relative;
`;
export const MapViewOverlay = styled.TouchableOpacity`
  width: 100%;
  height: ${`${MAP_HEIGHT}px`};
  border-radius: ${({theme}) => `${theme.borderRadii.lg}px`};
  overflow: hidden;
  background-color: #00000040;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const HistoryStack = styled.View`
  height: 55px;
  width: 100%;
`;

export const HistoryProgressLine = styled.View<{success?: boolean}>`
  width: ${`${StyleSheet.hairlineWidth}px`};
  height: 43px;
  background-color: ${({theme, success}) =>
    success ? ' #51B74F' : theme.palette.secondary.orange};
`;

export const HistoryProgressLineBox = styled.View`
  display: flex;
  align-items: center;
  margin-right: 23.33px;
`;

export const HistoryDot = styled.View`
  width: 14px;
  height: 14px;
  border-radius: ${({theme}) => `${theme.borderRadii.lg}px`};
  background-color: ${({theme}) => theme.palette.secondary.orange};
`;
export const RiderInfoBox = styled.View`
  position: absolute;
  z-index: 2;
  left: 0;
  top: ${`${SCREEN_HEIGHT - bottomBoxHeight}px`};
  width: ${`${SCREEN_WIDTH}px`};
  height: ${`${bottomBoxHeight}px`};
  padding: ${({theme}) =>
    `${theme.padding.medium}px ${generalHorizontalPadding}px`};
`;
