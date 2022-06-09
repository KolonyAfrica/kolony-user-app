import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {
  CenteredHeaderTitle,
  ICON_NAME,
  LocationInput,
  MARGIN_SIZES,
  Spacing,
  Address,
  AddressListView,
  Button,
  BUTTON_TYPES,
} from '../../components/shared';
import {
  ScreenWrapper,
  StyledScrollView,
  StyledText,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import {suggestedAddresses} from './data';

const SetLandMark = () => {
  const theme = useTheme();
  return (
    <ScreenWrapper>
      <SafeAreaView>
        <CenteredHeaderTitle
          title="Set Landmark"
          addBackText={false}
          mode="primary"
          moveTitleLeftBy={20}
          tooltip={{
            title: 'Set Landmark',
            content:
              'Landmarks help you track your package location in real time. Try it out!',
          }}
        />
        <StyledScrollView>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          <LocationInput
            label="Landmark"
            placeholder="Alara Jibowu Yaba"
            iconSize={20}
            inputLeftIcon={ICON_NAME.flag}
            onSelection={address =>
              console.log('Address', JSON.stringify(address, null, 2))
            }
          />
          <VerticalWrapper align="flex-start" marginTop={20} marginBottom={30}>
            <StyledText
              fontSize={theme.fontSizes.small}
              color={theme.palette.primary.blue900}
              fontWeight={400}>
              Suggested Landmarks
            </StyledText>
            <AddressListView>
              {suggestedAddresses.map(address => (
                <Address
                  key={address.place_id}
                  onSelection={() => {}}
                  {...address}
                />
              ))}
            </AddressListView>
          </VerticalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <Button text="Continue" type={BUTTON_TYPES.primary} fill />
        </StyledScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default SetLandMark;
