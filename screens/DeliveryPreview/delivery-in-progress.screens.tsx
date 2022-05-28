import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MapBox} from '../../components/shared/Map/styles';

const DeliveryInProgress = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <MapBox>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 6.5069594,
            longitude: 3.3808141,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </MapBox>
    </SafeAreaView>
  );
};

export default DeliveryInProgress;
