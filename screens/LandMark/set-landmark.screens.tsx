import React from 'react';
import {Animated, TouchableOpacity} from 'react-native';
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
import {SCREEN_WIDTH} from '../../components/shared/common/constants';
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
  const landmarkBoxAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [landmarkIndexToDelete, setLandmarkDeleteIndex] =
    React.useState<number>();

  const handleLandmarkSelection = React.useCallback((landmark: string) => {
    setSelectedLandmarks(landmarks =>
      landmarks.length < 3 ? [...landmarks, landmark] : landmarks,
    );
  }, []);

  React.useEffect(() => {
    if (landmarkIndexToDelete !== undefined) {
      const index = landmarkIndexToDelete;
      Animated.spring(landmarkBoxAnimatedValue, {
        toValue: 1,
        friction: 10,
        useNativeDriver: true,
      }).start(() => {
        setSelectedLandmarks(landmarks => [
          ...landmarks.slice(0, index),
          ...landmarks.slice(index + 1),
        ]);
        setLandmarkDeleteIndex(undefined);
        Animated.spring(landmarkBoxAnimatedValue, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [landmarkBoxAnimatedValue, landmarkIndexToDelete]);

  const landmarkTransformX = landmarkBoxAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -SCREEN_WIDTH],
  });

  const landmarkTransformY = landmarkBoxAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -66],
  });

  const deletedLandmarkStyle = {
    transform: [
      {
        translateX: landmarkTransformX,
      },
      {
        translateY: 0,
      },
    ],
  };
  const nonDeletedLandmarkStyle = {
    transform: [
      {
        translateY: landmarkTransformY,
      },
      {
        translateX: 0,
      },
    ],
  };

  const precinctStyle = {
    transform: [
      {
        translateY: 0,
      },
      {
        translateX: 0,
      },
    ],
  };

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
            <Animated.View
              key={landmark + index}
              style={
                landmarkIndexToDelete === index
                  ? deletedLandmarkStyle
                  : index > landmarkIndexToDelete!
                  ? nonDeletedLandmarkStyle
                  : precinctStyle
              }>
              <VerticalWrapper marginBottom={16} fill align="flex-start">
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
                  <TouchableOpacity
                    onPress={() => setLandmarkDeleteIndex(index)}>
                    <Icon name={ICON_NAME.add} direction="right" />
                  </TouchableOpacity>
                </HorizontalWrapper>
              </VerticalWrapper>
            </Animated.View>
          ))}
          {selectedLandmarks.length < 3 ? (
            <Animated.View>
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
            </Animated.View>
          ) : null}
        </StyledScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default SetLandMark;
