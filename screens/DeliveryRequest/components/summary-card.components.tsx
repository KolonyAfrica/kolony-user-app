import React from 'react';
import styled from 'styled-components/native';
import {Icon, ICON_NAME, MARGIN_SIZES} from '../../../components/shared';
import {
  HorizontalWrapper,
  VerticalWrapper,
} from '../../../components/shared/common/styles';
import Spacing from '../../../components/shared/Spacing';

/** styles */
const SummaryTitle = styled.Text`
  font-size: ${({theme}) => `${theme.fontSizes.body}px`};
  line-height: ${({theme}) => `${theme.lineHeight.body}px`};
  font-family: ${({theme}) => theme.fontTypes.body};
  font-weight: 400;
  color: ${({theme}) => theme.palette.tertiary.grey310};
`;

const EditBtnText = styled.Text`
  font-size: ${({theme}) => `${theme.fontSizes.small}px`};
  line-height: ${({theme}) => `${theme.lineHeight.small}px`};
  font-family: ${({theme}) => theme.fontTypes.body};
  color: ${({theme}) => theme.palette.primary.blue};
  font-weight: 500;
  letter-spacing: 1px;
`;

const EditBtnBox = styled.TouchableOpacity`
  width: 59px;
  height: 20px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const SummaryContentBox = styled.View`
  min-height: 99px;
  height: auto;
  width: 100%;
  padding: 10px;
  border-radius: ${({theme}) => `${theme.borderRadii.sm}px`};
  background-color: ${({theme}) => theme.palette.secondary.orange160};
`;

interface SummaryCardProps {
  title: string;
  edit: () => void;
  children: JSX.Element | JSX.Element[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({title, children, edit}) => {
  return (
    <VerticalWrapper justify="flex-start">
      <HorizontalWrapper justify="space-between" fill>
        <SummaryTitle>{title}</SummaryTitle>
        <EditBtnBox onPress={edit}>
          <EditBtnText>edit</EditBtnText>
          <Icon name={ICON_NAME.arrowCircle} />
        </EditBtnBox>
      </HorizontalWrapper>
      <Spacing direction="vertical" size={MARGIN_SIZES.small} />
      <SummaryContentBox>{children}</SummaryContentBox>
    </VerticalWrapper>
  );
};

export default SummaryCard;
