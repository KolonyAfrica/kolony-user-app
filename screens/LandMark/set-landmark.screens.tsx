import React from 'react';
import {TouchableOpacity} from 'react-native';
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
  Icon,
} from '../../components/shared';
import {
  HorizontalWrapper,
  ScreenWrapper,
  StyledScrollView,
  StyledText,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import {suggestedAddresses} from './data';
import {LandmarkBox} from './styles';

const SetLandMark = () => {
  const [selectedLandmarks, setSelectedLandmarks] = React.useState<string[]>(
    [],
  );

  const handleLandmarkSelection = React.useCallback((landmark: string) => {
    setSelectedLandmarks(landmarks =>
      landmarks.length < 3 ? [...landmarks, landmark] : landmarks,
    );
  }, []);

  const handleRemoveLandMark = React.useCallback(index => {
    return () => {
      setSelectedLandmarks(landmarks => [
        ...landmarks.slice(0, index),
        ...landmarks.slice(index + 1),
      ]);
    };
  }, []);

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

          {selectedLandmarks.map((landmark, index) => (
            <VerticalWrapper
              marginBottom={16}
              key={landmark + index}
              fill
              align="flex-start">
              <StyledText
                fontSize={theme.fontSizes.small}
                color={theme.palette.tertiary.grey310}
                fontWeight={400}
                marginBottom={theme.margin.small}>
                Landmark {index + 1}
              </StyledText>
              <HorizontalWrapper fill justify="space-between">
                <LandmarkBox>
                  <Icon
                    name={ICON_NAME.flag}
                    color={theme.palette.tertiary.grey210}
                  />
                  <StyledText
                    fontSize={theme.fontSizes.small}
                    color={theme.palette.tertiary.grey320}
                    fontWeight={400}
                    marginLeft={theme.margin.small}>
                    {landmark}
                  </StyledText>
                </LandmarkBox>
                <TouchableOpacity onPress={handleRemoveLandMark(index)}>
                  <Icon name={ICON_NAME.add} direction="right" />
                </TouchableOpacity>
              </HorizontalWrapper>
            </VerticalWrapper>
          ))}
          {selectedLandmarks.length < 3 ? (
            <>
              <LocationInput
                label="Landmark"
                placeholder="Alara Jibowu Yaba"
                iconSize={20}
                inputLeftIcon={ICON_NAME.flag}
                onSelection={address => handleLandmarkSelection(address.name)}
              />

              <VerticalWrapper
                align="flex-start"
                marginTop={20}
                marginBottom={30}>
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
                      onSelection={({name}) => {
                        handleLandmarkSelection(name);
                      }}
                      {...address}
                    />
                  ))}
                </AddressListView>
              </VerticalWrapper>
              <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
              <Button text="Continue" type={BUTTON_TYPES.primary} fill />
            </>
          ) : null}
        </StyledScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default SetLandMark;
