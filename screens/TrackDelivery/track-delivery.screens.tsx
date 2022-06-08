import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Button,
  BUTTON_SIZE,
  BUTTON_TYPES,
  Icon,
  ICON_NAME,
  MARGIN_SIZES,
  Spacing,
  TimeoutType,
} from '../../components/shared';
import CenteredHeaderTitle from '../../components/shared/CenteredHeaderTitle';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {
  FlexItemView,
  HorizontalWrapper,
  ScreenWrapper,
  StyledScrollView,
  StyledText,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import {
  HistoryDot,
  HistoryProgressLine,
  HistoryProgressLineBox,
  HistoryStack,
  MapViewBox,
} from './styles';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../components/shared/common/constants';
import {useTheme} from 'styled-components/native';
import {history as defaultHistory} from './data';
import utils from '../../components/shared/common/utils';

export const MAP_HEIGHT = (228 / SCREEN_HEIGHT) * SCREEN_HEIGHT;
const MAP_WIDTH_PADDING = (SCREEN_WIDTH - 48) / 20;
const MAP_HEIGHT_PADDING = MAP_HEIGHT / 20;

//dummy start and end coordinates
const startCoords = {
  latitude: 6.5069594,
  longitude: 3.3808141,
};

const endCoords = {
  latitude: 6.5664441,
  longitude: 3.3780085,
};

const TrackDelivery = () => {
  const mapRef = React.useRef<any>();
  const [history, setHistory] = React.useState(defaultHistory);
  const theme = useTheme();

  const simulateTimeFastForwards = React.useCallback(async () => {
    const ids: TimeoutType[] = [];
    for (let index = 0; index < history.length; index++) {
      await utils.wait(3000).then((timeoutId: any) => ids.push(timeoutId));
      setHistory(prevHistory => [
        ...prevHistory.slice(0, index),
        {...prevHistory[index], done: true},
        ...prevHistory.slice(index + 1),
      ]);
    }
    return ids;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const ids: TimeoutType[] = [];
    simulateTimeFastForwards()
      .then((timeoutIds: any) => ids.push(timeoutIds))
      .catch(console.error);

    return () => {
      ids.map(id => clearTimeout(id));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <CenteredHeaderTitle
          title="Track Delivery"
          addBackText={false}
          mode="primary"
          moveTitleLeftBy={20}
        />
        <StyledScrollView showsVerticalScrollIndicator={false}>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <MapViewBox>
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
                      right: MAP_WIDTH_PADDING,
                      bottom: MAP_HEIGHT_PADDING,
                      left: MAP_WIDTH_PADDING,
                      top: MAP_HEIGHT_PADDING,
                    },
                  });
                }}
              />
            </MapView>
          </MapViewBox>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <VerticalWrapper fill>
            <StyledText
              color={theme.palette.tertiary.grey310}
              fontSize={theme.fontSizes.tiny}
              fontWeight={400}
              marginBottom={8}>
              Est. Delivery Time
            </StyledText>
            <StyledText
              color={theme.palette.secondary.orange}
              fontSize={theme.fontSizes.h1}
              fontWeight={700}>
              10:28 AM
            </StyledText>
          </VerticalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <HorizontalWrapper fill justify="space-between">
            <StyledText
              color={theme.palette.tertiary.grey320}
              fontSize={theme.fontSizes.body}
              fontWeight={700}
              marginBottom={8}>
              Tracking History
            </StyledText>
            <StyledText
              color={theme.palette.tertiary.grey310}
              fontSize={theme.fontSizes.small}
              fontWeight={400}>
              Order ID #3423e4r
            </StyledText>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          <VerticalWrapper align="flex-start" justify="flex-start" fill>
            {history.map((historyPoint, index) => (
              <HistoryStack key={historyPoint.address + index}>
                <HorizontalWrapper fill align="flex-start">
                  <HistoryProgressLineBox>
                    {historyPoint.done ? (
                      <Icon name={ICON_NAME.successCheck} />
                    ) : (
                      <HistoryDot />
                    )}
                    <HistoryProgressLine success={historyPoint.done} />
                  </HistoryProgressLineBox>
                  <FlexItemView>
                    <VerticalWrapper align="flex-start" justify="flex-start">
                      <StyledText
                        color={theme.palette.tertiary.grey320}
                        fontSize={theme.fontSizes.small}
                        fontWeight={500}>
                        {historyPoint.title}
                      </StyledText>
                      <HorizontalWrapper fill justify="space-between">
                        <StyledText
                          color={theme.palette.tertiary.grey310}
                          fontSize={theme.fontSizes.tiny}
                          fontWeight={400}>
                          {utils.shortenWithEllipsis(historyPoint.address, 30)}
                        </StyledText>
                        <StyledText
                          color={theme.palette.tertiary.grey310}
                          fontSize={theme.fontSizes.tiny}
                          fontWeight={400}>
                          {historyPoint.date}
                        </StyledText>
                      </HorizontalWrapper>
                    </VerticalWrapper>
                  </FlexItemView>
                </HorizontalWrapper>
              </HistoryStack>
            ))}
          </VerticalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <StyledText
            color={theme.palette.tertiary.grey320}
            fontSize={theme.fontSizes.body}
            fontWeight={700}
            marginBottom={12}>
            Delivery Address
          </StyledText>
          <HorizontalWrapper>
            <StyledText
              color={theme.palette.tertiary.grey320}
              fontSize={theme.fontSizes.small}
              fontWeight={400}
              marginBottom={12}>
              Uniport Road, Owhipa Chopa, Choba, Port Harcourt, Rivers.
            </StyledText>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <HorizontalWrapper fill>
            <FlexItemView>
              <Button
                size={BUTTON_SIZE.medium}
                type={BUTTON_TYPES.text}
                text="Set Landmark"
                fill
              />
            </FlexItemView>
            <Spacing size={MARGIN_SIZES.small} />
            <FlexItemView>
              <Button
                size={BUTTON_SIZE.medium}
                type={BUTTON_TYPES.primary}
                text="Change Receiver"
                fill
              />
            </FlexItemView>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        </StyledScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default TrackDelivery;
