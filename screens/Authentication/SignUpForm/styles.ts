import styled from 'styled-components/native';

export const SignUpFormFooterText = styled.Text`
  font-size: ${({theme}) => `${theme.fontSizes.tiny}px`};
  line-height: ${({theme}) => `${theme.lineHeight.tiny}px`};
  color: ${({theme}) => theme.palette.tertiary.grey440};
  font-family: ${({theme}) => theme.fontTypes.body};
  font-weight: 400;
`;
