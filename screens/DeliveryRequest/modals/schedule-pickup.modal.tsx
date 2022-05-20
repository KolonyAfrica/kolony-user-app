import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import {Calendar, CalendarProps} from 'react-native-calendars';
import {
  BottomModal,
  BOTTOM_MODAL_SIZE,
  Button,
  BUTTON_TYPES,
  Dropdown,
  Icon,
  ICON_NAME,
  MARGIN_SIZES,
} from '../../../components/shared';
import {
  FlexItemView,
  HorizontalWrapper,
  ScreenWrapper,
  StyledScrollView,
} from '../../../components/shared/common/styles';
import Spacing from '../../../components/shared/Spacing';

/** styles */
const CalendarHeaderText = styled.Text`
  font-size: ${({theme}) => `${theme.fontSizes.h2}px`};
  line-height: ${({theme}) => `${theme.lineHeight.h2}px`};
  color: ${({theme}) => theme.palette.primary.blue900};
  font-family: ${({theme}) => theme.fontTypes.body};
  font-weight: 700;
`;

const TimeText = styled.Text`
  font-size: ${({theme}) => `${theme.fontSizes.small}px`};
  line-height: ${({theme}) => `${theme.lineHeight.small}px`};
  color: ${({theme}) => theme.palette.tertiary.grey440};
  font-family: ${({theme}) => theme.fontTypes.body};
  font-weight: 500;
  margin-right: ${({theme}) => `${theme.margin.small}px`};
`;

interface PickerProps {
  visible: boolean;
  applySelectedSchedule: () => void;
  children?: JSX.Element | JSX.Element[];
  onRequestClose: () => void;
}

const hours = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
  {label: '6', value: '6'},
  {label: '7', value: '7'},
  {label: '8', value: '8'},
];

type fontWeightType =
  | 'bold'
  | 'normal'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

const SchedulePickupModal: React.FC<PickerProps> = ({
  visible,
  onRequestClose,
  applySelectedSchedule,
}) => {
  const [selected, setSelected] = React.useState(
    new Date().toISOString().substring(0, 10),
  );
  const theme = useTheme();

  const onDayPress: CalendarProps['onDayPress'] = React.useCallback(day => {
    setSelected(day.dateString);
  }, []);

  const marked = React.useMemo(() => {
    const today = new Date().toISOString().substring(0, 10);
    if (today === selected) {
      return {
        [selected]: {
          selected: true,
          disableTouchEvent: true,
          selectedColor: theme.palette.primary.blue,
          selectedTextColor: '#ffffff',
          customStyles: {
            text: {
              color: theme.palette.primary.blue,
              fontWeight: '700' as fontWeightType,
            },
            container: {
              backgroundColor: '#ffffff',
              borderWidth: 1,
              borderColor: theme.palette.primary.blue,
              borderRadius: 32,
            },
          },
        },
      };
    }

    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: theme.palette.primary.blue,
        selectedTextColor: '#ffffff',
      },
    };
  }, [selected, theme.palette.primary.blue]);

  return (
    <BottomModal
      visible={visible}
      onRequestClose={onRequestClose}
      size={BOTTOM_MODAL_SIZE.medium}>
      <ScreenWrapper>
        <StyledScrollView showsVerticalScrollIndicator={false}>
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          <Calendar
            current={selected}
            theme={{
              todayTextColor: theme.palette.primary.blue,
              todayBackgroundColor: '#ffffff',
              textDayFontFamily: theme.fontTypes.body,
              textMonthFontFamily: theme.fontTypes.body,
              textDayHeaderFontFamily: theme.fontTypes.body,
              textDayFontSize: 14,
              textMonthFontSize: 14,
              textMonthFontWeight: 'bold',
              textDisabledColor: theme.palette.tertiary.grey310,
              textDayFontWeight: '400',
              header: {
                marginBottom: 10,
              },
            }}
            onDayPress={onDayPress}
            markingType="custom"
            markedDates={marked}
            renderArrow={direction => (
              <>
                <Icon
                  name={ICON_NAME.arrow}
                  direction={direction}
                  color={theme.palette.primary.blue900}
                />
                <Spacing size={MARGIN_SIZES.large} />
              </>
            )}
            renderHeader={date => (
              <CalendarHeaderText>
                {new Date(date).toLocaleString('default', {month: 'long'})}{' '}
                {date.getFullYear()}
              </CalendarHeaderText>
            )}
          />
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          <HorizontalWrapper justify="center">
            <Icon
              name={ICON_NAME.clock}
              color={theme.palette.primary.blue}
              size={28}
            />
            <Spacing size={MARGIN_SIZES.small} />
            <Dropdown onSelect={() => {}} data={hours} justify="center">
              <HorizontalWrapper>
                <TimeText>09</TimeText>
                <Icon
                  name={ICON_NAME.arrow}
                  direction="down"
                  color={theme.palette.secondary.orange410}
                />
              </HorizontalWrapper>
            </Dropdown>
            <Spacing />
            <TimeText>to</TimeText>
            <Spacing />
            <Dropdown onSelect={() => {}} justify="center" data={hours}>
              <HorizontalWrapper>
                <TimeText>11</TimeText>
                <Icon
                  name={ICON_NAME.arrow}
                  direction="down"
                  color={theme.palette.secondary.orange410}
                />
              </HorizontalWrapper>
            </Dropdown>
            <Spacing size={MARGIN_SIZES.small} />
            <Dropdown
              onSelect={() => {}}
              justify="center"
              data={[
                {label: 'AM', value: 'AM'},
                {label: 'PM', value: 'PM'},
              ]}>
              <HorizontalWrapper>
                <TimeText>AM</TimeText>
                <Icon
                  name={ICON_NAME.arrow}
                  direction="down"
                  color={theme.palette.secondary.orange410}
                />
              </HorizontalWrapper>
            </Dropdown>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <HorizontalWrapper>
            <FlexItemView>
              <Button
                type={BUTTON_TYPES.primary}
                text="Apply"
                fill
                onPress={applySelectedSchedule}
              />
            </FlexItemView>
            <Spacing size={MARGIN_SIZES.small2} />
            <FlexItemView>
              <Button
                type={BUTTON_TYPES.primaryALT}
                text="Cancel"
                fill
                onPress={onRequestClose}
              />
            </FlexItemView>
          </HorizontalWrapper>
        </StyledScrollView>
      </ScreenWrapper>
    </BottomModal>
  );
};

export default SchedulePickupModal;
