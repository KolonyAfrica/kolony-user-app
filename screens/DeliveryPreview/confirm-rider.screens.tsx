import React from 'react';
import {StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
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
  ProfileImage,
  PushToEnd,
  StyledText,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import {
  AnimatedBottomOverlay,
  Button,
  BUTTON_TYPES,
  Icon,
  IconButton,
  ICON_BUTTON_SIZE,
  ICON_BUTTON_TYPE,
  ICON_NAME,
  MARGIN_SIZES,
  ModalType,
  Spacing,
  TimeoutType,
  useCallAndSMS,
} from '../../components/shared';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, ROOT_ROUTES} from '../../navigation/typing';
import {useNavigation, useRoute} from '@react-navigation/native';
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

interface DeliveryInProgressProps {
  show: boolean;
  riderHasArrived: boolean;
  setPromptModal: (modal: ModalType) => void;
}

const DeliveryInProgress: React.FC<DeliveryInProgressProps> = React.memo(
  ({show, riderHasArrived, setPromptModal}) => {
    const theme = useTheme();
    return (
      <AnimatedBottomOverlay show={show}>
        <VerticalWrapper fill align="flex-start" justify="flex-start">
          <StyledText
            fontWeight={700}
            fontSize={theme.fontSizes.h2}
            color={theme.palette.tertiary.grey320}
            marginBottom={theme.margin.small}>
            {riderHasArrived ? 'Rider has arrived' : 'Arriving in 2 mins'}
          </StyledText>
          <HorizontalWrapper>
            <StyledText
              fontWeight={400}
              fontSize={theme.fontSizes.tiny}
              color={theme.palette.tertiary.grey310}
              marginRight={10}>
              Qlink Motorcycle
            </StyledText>
            <StyledText
              fontWeight={400}
              fontSize={theme.fontSizes.tiny}
              color={theme.palette.tertiary.grey320}
              marginRight={10}>
              UPS
            </StyledText>
            <StyledText
              fontWeight={700}
              fontSize={theme.fontSizes.small}
              color={theme.palette.tertiary.grey320}>
              JJC234QC
            </StyledText>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          <HorizontalWrapper fill justify="space-between">
            <VerticalWrapper>
              <ProfileImage
                source={require('../../assets/images/profile.jpeg')}
              />
              <StyledText
                fontWeight={400}
                fontSize={theme.fontSizes.small}
                color={theme.palette.tertiary.grey320}>
                Emmanuel
              </StyledText>
            </VerticalWrapper>
            <VerticalWrapper>
              <IconButton
                icon={ICON_NAME.call}
                type={ICON_BUTTON_TYPE.primary}
                size={ICON_BUTTON_SIZE.medium}
                onPress={() => setPromptModal('call')}
              />
              <StyledText
                fontWeight={400}
                fontSize={theme.fontSizes.small}
                color={theme.palette.tertiary.grey320}>
                Call
              </StyledText>
            </VerticalWrapper>
            <VerticalWrapper>
              <IconButton
                icon={ICON_NAME.message}
                type={ICON_BUTTON_TYPE.primary}
                size={ICON_BUTTON_SIZE.medium}
                onPress={() => setPromptModal('sms')}
              />
              <StyledText
                fontWeight={400}
                fontSize={theme.fontSizes.small}
                color={theme.palette.tertiary.grey320}>
                Chat
              </StyledText>
            </VerticalWrapper>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          <TouchableOpacity>
            <HorizontalWrapper fill justify="space-between">
              <HorizontalWrapper align="flex-start">
                <Icon
                  name={ICON_NAME.locationPointer}
                  color={theme.palette.primary.blue}
                  size={20}
                />
                <Spacing size={MARGIN_SIZES.small} />
                <VerticalWrapper justify="flex-start" align="flex-start">
                  <StyledText
                    fontWeight={400}
                    fontSize={theme.fontSizes.small}
                    color={theme.palette.tertiary.grey320}
                    marginTop={-3}
                    marginBottom={theme.margin.tiny}>
                    12 Ozumba Mbadiwe Avenue, VI
                  </StyledText>
                  <StyledText
                    fontWeight={400}
                    fontSize={theme.fontSizes.tiny}
                    color={theme.palette.tertiary.grey310}>
                    Track rider's movement
                  </StyledText>
                </VerticalWrapper>
              </HorizontalWrapper>
              <VerticalWrapper>
                <Icon
                  name={ICON_NAME.arrow}
                  direction="right"
                  color={theme.palette.tertiary.grey310}
                />
              </VerticalWrapper>
            </HorizontalWrapper>
          </TouchableOpacity>
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          {!riderHasArrived ? (
            <Button
              text="Cancel Delivery"
              type={BUTTON_TYPES.ghostError}
              fill
            />
          ) : null}
        </VerticalWrapper>
      </AnimatedBottomOverlay>
    );
  },
);

const ConfirmRider = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps['navigation']>();
  const route = useRoute<NavigationProps['route']>();
  const [promptModal, setPromptModal] = React.useState<
    'call' | 'sms' | undefined
  >();
  const [riderHasArrived, setRiderHasArrived] = React.useState<boolean>(false);
  const mapRef = React.useRef<any>();
  const [selectedRider, setSelectedRider] = React.useState<boolean>(false);
  const CallAndSMSModal = useCallAndSMS(
    navigation,
    promptModal,
    setPromptModal,
    '+2349067586542',
  );

  /** simulate rider arrival */
  React.useEffect(() => {
    const timeoutIds: TimeoutType[] = [];
    if (selectedRider) {
      utils.wait(8000).then(timeoutId => {
        setRiderHasArrived(true);
        timeoutIds.push(timeoutId as TimeoutType);
      });
      utils.wait(9200).then(timeoutId => {
        timeoutIds.push(timeoutId as TimeoutType);
        navigation.navigate(ROOT_ROUTES.RIDER_FEEDBACK);
      });
    }
    return () => {
      timeoutIds.forEach(id => {
        if (id) {
          clearTimeout(id);
        }
      });
    };
  }, [navigation, selectedRider]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <CallAndSMSModal />
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
      <DeliveryInProgress
        show={selectedRider}
        riderHasArrived={riderHasArrived}
        setPromptModal={setPromptModal}
      />
      <AnimatedBottomOverlay show={!selectedRider}>
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
              onPress={() => setPromptModal('call')}
            />
            <Spacing size={MARGIN_SIZES.small} />
            <IconButton
              icon={ICON_NAME.message}
              type={ICON_BUTTON_TYPE.primary}
              size={ICON_BUTTON_SIZE.medium}
              onPress={() => setPromptModal('sms')}
            />
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          <HorizontalWrapper>
            <FlexItemView>
              <Button
                type={BUTTON_TYPES.primaryALT}
                text="Cancel Order"
                fill
                onPress={() => {
                  navigation.navigate(ROOT_ROUTES.PAYMENT_SUMMARY, {
                    progress: 3,
                    ...route?.params,
                  });
                }}
              />
            </FlexItemView>
            <Spacing size={MARGIN_SIZES.small} />
            <FlexItemView>
              <Button
                type={BUTTON_TYPES.primary}
                text="Select Rider"
                fill
                onPress={() => setSelectedRider(true)}
              />
            </FlexItemView>
          </HorizontalWrapper>
        </VerticalWrapper>
      </AnimatedBottomOverlay>
    </SafeAreaView>
  );
};

export default ConfirmRider;
