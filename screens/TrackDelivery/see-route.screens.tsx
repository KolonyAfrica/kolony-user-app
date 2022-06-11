import {GOOGLE_MAPS_API_KEY} from '@env';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled, {useTheme} from 'styled-components/native';
import {CenteredHeaderTitle} from '../../components/shared';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../components/shared/common/constants';
import {
  generalHorizontalPadding,
  HorizontalWrapper,
} from '../../components/shared/common/styles';

//constants
const MAP_HEIGHT = SCREEN_HEIGHT - 40;

/**
 * Latitude: 6°21′06″N   6.35171679
Longitude: 4°01′14″E   4.02048998
Distance: 72.7793 km  Bearing: 103.688°

 */

//dummy start and end coordinates
const startCoords = {
  latitude: 6.5069594,
  longitude: 3.3808141,
};

const landmarkCoords = [
  {
    latitude: 6.3517168,
    longitude: 4.020489,
  },
  {
    latitude: 6.4766299,
    longitude: 3.8615826,
  },
];

const endCoords = {
  latitude: 6.5664441,
  longitude: 3.3780085,
};

const MapViewBox = styled.View`
  height: ${`${MAP_HEIGHT}px`};
  width: ${`${SCREEN_WIDTH}px`};
`;

const style = {backgroundColor: '#ffffff'};

const SeeRoute = () => {
  const mapRef = React.useRef<any>();
  const theme = useTheme();
  return (
    <View style={style}>
      <SafeAreaView>
        <HorizontalWrapper marginLeft={generalHorizontalPadding}>
          <CenteredHeaderTitle
            title="See Route"
            addBackText={false}
            mode="primary"
            moveTitleLeftBy={generalHorizontalPadding}
          />
        </HorizontalWrapper>
        <MapViewBox>
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              ...startCoords,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {landmarkCoords.map((landmark, index) => (
              <Marker
                key={index}
                coordinate={landmark}
                image={require('../../assets/images/flag.png')}
              />
            ))}
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
        </MapViewBox>
      </SafeAreaView>
    </View>
  );
};

export default SeeRoute;
