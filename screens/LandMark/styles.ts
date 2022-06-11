import styled from 'styled-components/native';

export const LandmarkBox = styled.View`
  width: 286px;
  height: 44px;
  background-color: ${({theme}) => theme.palette.tertiary.grey220};
  border-radius: ${({theme}) => `${theme.borderRadii.sm}px`};
  padding: ${({theme}) =>
    `${theme.padding.small2}px ${theme.padding.medium}px`};
  flex-direction: row;
`;
