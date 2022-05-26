import React from 'react';
import {StatusBar, StyleSheet, Animated} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled, {useTheme} from 'styled-components/native';
import {MapBox} from './find-rider.screens';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../../components/shared/common/constants';
import {
  FlexItemView,
  HorizontalWrapper,
  PushToEnd,
  StyledText,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import {
  Button,
  BUTTON_TYPES,
  Icon,
  IconButton,
  ICON_BUTTON_SIZE,
  ICON_BUTTON_TYPE,
  ICON_NAME,
  MARGIN_SIZES,
  Spacing,
} from '../../components/shared';

const riderBoxHeight = (270 / SCREEN_HEIGHT) * SCREEN_HEIGHT;

//dummy start and end coordinates
const startCoords = {
  latitude: 6.5069594,
  longitude: 3.3808141,
};

const endCoords = {
  latitude: 6.5664441,
  longitude: 3.3780085,
};

const AddressBannerBox = styled.View`
  width: ${`${SCREEN_WIDTH - 48}px`};
  height: 48px;
  background-color: #ffffff;
  position: absolute;
  z-index: 2;
  top: 40px;
  left: 24px;
  border-radius: 60px;
  padding: ${({theme}) => `${theme.padding.small}px 32.5px`};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AddressArea = styled.View`
  background-color: ${({theme}) => theme.palette.secondary.orange160};
  margin-left: ${({theme}) => `${theme.margin.small}px`};
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  height: 32px;
  padding-left: 18px;
  border-radius: ${({theme}) => `${theme.borderRadii.md}px`};
`;

const RiderBox = styled(Animated.View)`
  position: absolute;
  z-index: 2;
  left: 0px;
  top: ${`${SCREEN_HEIGHT - riderBoxHeight}px`};
  background-color: #ffffff;
  width: ${`${SCREEN_WIDTH}px`};
  height: ${`${riderBoxHeight}px`};
  border-top-right-radius: ${({theme}) => `${theme.borderRadii.lg}px`};
  border-top-left-radius: ${({theme}) => `${theme.borderRadii.lg}px`};
  padding: 25px 24.5px;
`;

const RiderImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 70px;
`;

const ConfirmRider = () => {
  const theme = useTheme();
  const riderBoxAnimatedValue = React.useRef(new Animated.Value(0)).current;
  let riderBoxTimeoutId = React.useRef<ReturnType<typeof setTimeout>>();
  const mapRef = React.useRef<any>();

  React.useEffect(
    function AnimateRiderBox() {
      riderBoxTimeoutId.current = setTimeout(() => {
        Animated.spring(riderBoxAnimatedValue, {
          toValue: 1,
          friction: 10,
          useNativeDriver: true,
        }).start();
      }, 1200);

      return () => {
        if (riderBoxTimeoutId.current) {
          clearTimeout(riderBoxTimeoutId.current);
        }
      };
    },
    [riderBoxAnimatedValue],
  );

  const transformYValue = riderBoxAnimatedValue.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [riderBoxHeight, -50, 0],
  });

  const riderBoxStyles = {
    transform: [
      {
        translateY: transformYValue,
      },
    ],
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <MapBox>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            ...startCoords,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={startCoords}
            image={require('../../assets/images/current-location.png')}
          />
          <Marker coordinate={endCoords} />
          <MapViewDirections
            origin={startCoords}
            destination={endCoords}
            strokeColor={theme.palette.primary.blue}
            strokeWidth={4}
            apikey={GOOGLE_MAPS_API_KEY}
            optimizeWaypoints
            onReady={result => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: SCREEN_WIDTH / 20,
                  bottom: SCREEN_HEIGHT / 20,
                  left: SCREEN_WIDTH / 20,
                  top: SCREEN_HEIGHT / 20,
                },
              });
            }}
          />
        </MapView>
      </MapBox>
      <AddressBannerBox>
        <AddressArea>
          <Icon
            name={ICON_NAME.locationPointer}
            color={theme.palette.secondary.orange410}
            size={18}
          />
          <Spacing />
          <StyledText
            fontWeight={400}
            fontSize={theme.fontSizes.small}
            color={theme.palette.tertiary.grey320}>
            12 Isaac John Street
          </StyledText>
        </AddressArea>
      </AddressBannerBox>
      <RiderBox style={riderBoxStyles}>
        <VerticalWrapper align="flex-start" justify="flex-start" fill>
          <HorizontalWrapper align="flex-start">
            <RiderImage source={require('../../assets/images/profile.jpeg')} />
            <Spacing />
            <VerticalWrapper align="flex-start" justify="flex-start">
              <StyledText
                fontWeight={700}
                fontSize={theme.fontSizes.body}
                color={theme.palette.tertiary.grey320}
                marginBottom={theme.margin.tiny}>
                Emmanuel Kokoma (Rider)
              </StyledText>
              <HorizontalWrapper>
                <Icon
                  name={ICON_NAME.star}
                  size={18}
                  color={theme.palette.primary.blue}
                />
                <StyledText
                  fontWeight={400}
                  fontSize={theme.fontSizes.small}
                  color={theme.palette.tertiary.grey320}>
                  {'  4.5'}
                </StyledText>
              </HorizontalWrapper>
              <StyledText
                fontWeight={400}
                fontSize={theme.fontSizes.small}
                color={theme.palette.tertiary.grey310}
                marginTop={theme.margin.tiny}>
                Est time: 6 mins
              </StyledText>
            </VerticalWrapper>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          <HorizontalWrapper fill>
            <VerticalWrapper align="flex-start" justify="flex-start">
              <StyledText
                fontWeight={400}
                fontSize={theme.fontSizes.small}
                color={theme.palette.tertiary.grey310}>
                Toyota Corolla
              </StyledText>
              <StyledText
                fontWeight={700}
                fontSize={theme.fontSizes.small}
                color={theme.palette.tertiary.grey320}
                marginTop={theme.margin.tiny}>
                JJC234QC
              </StyledText>
            </VerticalWrapper>
            <PushToEnd pos="right" />
            <IconButton
              icon={ICON_NAME.call}
              type={ICON_BUTTON_TYPE.primary}
              size={ICON_BUTTON_SIZE.medium}
            />
            <Spacing size={MARGIN_SIZES.small} />
            <IconButton
              icon={ICON_NAME.message}
              type={ICON_BUTTON_TYPE.primary}
              size={ICON_BUTTON_SIZE.medium}
            />
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          <HorizontalWrapper>
            <FlexItemView>
              <Button type={BUTTON_TYPES.primaryALT} text="Cancel Order" fill />
            </FlexItemView>
            <Spacing size={MARGIN_SIZES.small} />
            <FlexItemView>
              <Button type={BUTTON_TYPES.primary} text="Select Rider" fill />
            </FlexItemView>
          </HorizontalWrapper>
        </VerticalWrapper>
      </RiderBox>
    </SafeAreaView>
  );
};

export default ConfirmRider;
