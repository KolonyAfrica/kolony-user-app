import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
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
  ScreenWrapper,
  StyledText,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import {
  AnimatedBottomOverlay,
  BottomModal,
  BOTTOM_MODAL_SIZE,
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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, ROOT_ROUTES} from '../../navigation/typing';
import {useNavigation} from '@react-navigation/native';
import utils from '../../components/shared/common/utils';

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

const RiderImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 70px;
`;

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  ROOT_ROUTES.CONFIRM_RIDER
>;

const ConfirmRider = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps['navigation']>();
  const [showPromptModal, setShowPromptModal] = React.useState<
    'call' | 'sms' | undefined
  >();
  const mapRef = React.useRef<any>();

  /** navigate to chat screen */
  const goToChatScreen = React.useCallback(() => {
    setShowPromptModal(undefined);
    utils
      .wait(400)
      .then(() => navigation.navigate(ROOT_ROUTES.USER_RIDER_CHAT));
  }, [navigation]);

  /** prompt phone messaging app to send sms with charges */
  const nativelySendSMSWithPhone = React.useCallback((phone: string) => {
    return () => {
      utils.sendMessage(phone);
    };
  }, []);

  const nativelyCallWithPhone = React.useCallback((phone: string) => {
    return () => {
      utils.callNumber(phone);
    };
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <BottomModal
        visible={!!showPromptModal}
        onRequestClose={() => setShowPromptModal(undefined)}
        size={BOTTOM_MODAL_SIZE.small}>
        {showPromptModal === 'call' ? (
          <ScreenWrapper>
            <VerticalWrapper fill>
              <Spacing direction="vertical" size={MARGIN_SIZES.small} />
              <StyledText
                fontWeight={400}
                fontSize={theme.fontSizes.body}
                color={theme.palette.tertiary.grey320}>
                Call Emmanuel?
              </StyledText>
              <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
              <Button
                type={BUTTON_TYPES.primary}
                text="Call +2349874736445"
                onPress={nativelyCallWithPhone('+2349874736445')}
                fill
              />
              <Spacing direction="vertical" size={MARGIN_SIZES.small} />
              <StyledText
                fontWeight={500}
                fontSize={theme.fontSizes.body}
                color={theme.palette.tertiary.grey320}>
                Call on Kolony (coming soon)
              </StyledText>
            </VerticalWrapper>
          </ScreenWrapper>
        ) : (
          <ScreenWrapper>
            <VerticalWrapper fill>
              <Spacing direction="vertical" size={MARGIN_SIZES.small} />
              <StyledText
                fontWeight={400}
                fontSize={theme.fontSizes.body}
                color={theme.palette.tertiary.grey320}>
                Chat with Emmanuel?
              </StyledText>
              <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
              <Button
                type={BUTTON_TYPES.primary}
                text="Send SMS"
                onPress={nativelySendSMSWithPhone('+2349793653678')}
                fill
              />
              <Spacing direction="vertical" size={MARGIN_SIZES.small} />
              <Button
                type={BUTTON_TYPES.primaryALT}
                text="Send Message on Kolony"
                onPress={goToChatScreen}
                fill
              />
            </VerticalWrapper>
          </ScreenWrapper>
        )}
      </BottomModal>
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
            Bamidele Adebule Maryland
          </StyledText>
        </AddressArea>
      </AddressBannerBox>
      <AnimatedBottomOverlay>
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
              onPress={() => setShowPromptModal('call')}
            />
            <Spacing size={MARGIN_SIZES.small} />
            <IconButton
              icon={ICON_NAME.message}
              type={ICON_BUTTON_TYPE.primary}
              size={ICON_BUTTON_SIZE.medium}
              onPress={() => setShowPromptModal('sms')}
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
      </AnimatedBottomOverlay>
    </SafeAreaView>
  );
};

export default ConfirmRider;
