import React from 'react';
import {Animated, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled, {useTheme} from 'styled-components/native';
import {
  Button,
  BUTTON_TYPES,
  Icon,
  ICON_NAME,
  MARGIN_SIZES,
  Spacing,
} from '../../components/shared';
import {
  statusBarHeight,
  StyledText,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../components/shared/common/constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, ROOT_ROUTES} from '../../navigation/typing';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView from 'react-native-maps';

export const MapBox = styled.View`
  width: ${`${SCREEN_WIDTH}px`};
  height: ${`${SCREEN_HEIGHT}px`};
`;

const OverlayBox = styled.View`
  position: relative;
  z-index: 2;
  background-color: #000000;
  opacity: 0.6;
  width: 100%;
  height: 100%;
  position: absolute;
  top: ${`${statusBarHeight}px`};
`;

const FindingRidersBanner = styled.View`
  height: 88px;
  width: ${`${SCREEN_WIDTH - 32}px`};
  background-color: #ffffff;
  border-radius: ${({theme}) => `${theme.borderRadii.sm}px`};
  position: absolute;
  z-index: 2;
  top: ${`${statusBarHeight + 18}px`};
  left: 16px;
  padding: ${({theme}) => `${theme.padding.small2}px`};
`;

const CancelRequestBox = styled.View`
  position: absolute;
  z-index: 2;
  bottom: 150px;
  left: 16px;
  background-color: transparent;
  width: ${`${SCREEN_WIDTH - 32}px`};
  height: auto;
`;

const Ripple = styled(Animated.View)`
  width: 222px;
  height: 222px;
  border-radius: 222px;
  position: absolute;
  left: ${`${SCREEN_WIDTH / 2 - 111}px`};
  top: ${`${SCREEN_WIDTH / 2 - 111}px`};
  background-color: ${({theme}) => theme.palette.primary.blue400};
`;

const LoaderBox = styled.View`
  position: absolute;
  z-index: 2;
  width: ${`${SCREEN_WIDTH - 32}px`};
  height: ${`${SCREEN_WIDTH}px`};
  top: ${`${SCREEN_HEIGHT / 2 - SCREEN_WIDTH / 2}px`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchIconBox = styled.View`
  position: absolute;
  z-index: 3;
  left: ${`${SCREEN_WIDTH / 2 - 25}px`};
  top: ${`${SCREEN_WIDTH / 2 - 25}px`};
`;

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  ROOT_ROUTES.FIND_RIDER
>;

const FindRiderLoader: React.FC<{foundRider?: Rider}> = ({foundRider}) => {
  const navigation = useNavigation<NavigationProps['navigation']>();
  const rippleValueOne = React.useRef(new Animated.Value(0)).current;
  const rippleValueTwo = React.useRef(new Animated.Value(0)).current;
  const rippleValueThree = React.useRef(new Animated.Value(0)).current;
  const rippleAnimation = React.useRef(
    Animated.parallel([
      Animated.loop(
        Animated.timing(rippleValueOne, {
          toValue: 1,
          duration: 2500,
          delay: 100,
          useNativeDriver: true,
        }),
      ),
      Animated.loop(
        Animated.timing(rippleValueTwo, {
          toValue: 1,
          duration: 3000,
          delay: 500,
          useNativeDriver: true,
        }),
      ),
      Animated.loop(
        Animated.timing(rippleValueThree, {
          toValue: 1,
          duration: 3000,
          delay: 1200,
          useNativeDriver: true,
        }),
      ),
    ]),
  );

  React.useEffect(
    function startAnimation() {
      if (foundRider) {
        rippleAnimation.current.stop();
        navigation.navigate(ROOT_ROUTES.CONFIRM_RIDER, {
          rider: foundRider,
        });
      } else {
        rippleAnimation.current.start();
      }
    },
    [foundRider, navigation],
  );

  /** for the first ripple **/
  const opacityRippleOne = rippleValueOne.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const scaleRippleOne = rippleValueOne.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  /**** for the second ripple ****/
  const opacityRippleTwo = rippleValueTwo.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const scaleRippleTwo = rippleValueTwo.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  /**** for the third ripple ****/
  const opacityRippleThree = rippleValueThree.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const scaleRippleThree = rippleValueThree.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  const rippleOneAnimationStyles = {
    opacity: opacityRippleOne,
    transform: [{scale: scaleRippleOne}],
  };

  const rippleTwoAnimationStyles = {
    opacity: opacityRippleTwo,
    transform: [{scale: scaleRippleTwo}],
  };

  const rippleThreeAnimationStyles = {
    opacity: opacityRippleThree,
    transform: [{scale: scaleRippleThree}],
  };

  return (
    <LoaderBox>
      <Ripple style={rippleOneAnimationStyles} />
      <Ripple style={rippleTwoAnimationStyles} />
      <Ripple style={rippleThreeAnimationStyles} />
      <SearchIconBox>
        <Icon name={ICON_NAME.mapSearchIcon} />
      </SearchIconBox>
    </LoaderBox>
  );
};

const dummyFoundRider = {
  name: 'Emmanuel Kokoma (Rider)',
  vehicle: 'Toyota Corolla',
  plateNumber: 'JJC234QC',
  estTime: '6 mins',
  rating: 4.5,
};

export interface Rider {
  name: string;
  vehicle: string;
  plateNumber: string;
  estTime: string;
  rating: number;
}

const FindRider = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps['navigation']>();
  const route = useRoute<NavigationProps['route']>();
  const [foundRider, setFoundRider] = React.useState<Rider | undefined>();
  let timeoutId = React.useRef<ReturnType<typeof setTimeout>>();

  const findRider = () => {
    timeoutId.current = setTimeout(() => {
      setFoundRider(dummyFoundRider);
    }, 8000);

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  };

  React.useEffect(findRider, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <MapBox>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 6.505967,
            longitude: 3.361695,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </MapBox>
      <OverlayBox />
      <FindingRidersBanner>
        <VerticalWrapper justify="flex-start" align="flex-start">
          <StyledText
            fontSize={theme.fontSizes.small}
            fontWeight={700}
            color={theme.palette.primary.blue900}>
            Finding Riders
          </StyledText>
          <Spacing direction="vertical" />
          <StyledText
            fontSize={theme.fontSizes.small}
            fontWeight={400}
            color={theme.palette.tertiary.grey320}>
            We are searching for riders nearby for order #54321AD
          </StyledText>
        </VerticalWrapper>
      </FindingRidersBanner>
      <FindRiderLoader foundRider={foundRider} />
      <CancelRequestBox>
        <StyledText
          fontSize={theme.fontSizes.body}
          fontWeight={700}
          textAlign="center"
          color={theme.palette.white}>
          Finding you a nearby rider...
        </StyledText>
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <Button
          type={BUTTON_TYPES.error}
          text="Cancel Request"
          fill
          onPress={() =>
            navigation.navigate(ROOT_ROUTES.CANCEL_DELIVERY, {
              ...route.params,
            })
          }
          leftIcon={({textColor}) => (
            <Icon
              key="cancel-request"
              name={ICON_NAME.closeCircle}
              color={textColor}
            />
          )}
        />
      </CancelRequestBox>
    </SafeAreaView>
  );
};

export default FindRider;
