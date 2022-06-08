import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const OrderItemBox = styled.TouchableOpacity<{show?: boolean}>`
  border-bottom-width: ${({show = true}) =>
    show ? `${StyleSheet.hairlineWidth}px` : '0px'};
  border-color: ${({theme}) => theme.palette.secondary.orange320};
  padding-bottom: 18px;
  margin-bottom: 18px;
`;

export const OrderItemImage = styled.Image`
  width: 50px;
  height: 50px
  border-radius: 4px;
`;
