/** Track Delivery */

import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {MAP_HEIGHT} from './track-delivery.screens';

export const MapViewBox = styled.View`
  width: 100%;
  height: ${`${MAP_HEIGHT}px`};
  border-radius: ${({theme}) => `${theme.borderRadii.lg}px`};
  overflow: hidden;
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
