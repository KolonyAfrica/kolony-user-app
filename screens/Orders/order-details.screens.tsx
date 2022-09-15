import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {
  Button,
  BUTTON_TYPES,
  CenteredHeaderTitle,
  Icon,
  IconButton,
  ICON_BUTTON_SIZE,
  ICON_BUTTON_TYPE,
  ICON_NAME,
  MARGIN_SIZES,
  Spacing,
  useCallAndSMS,
} from '../../components/shared';
import {
  FlexItemView,
  HorizontalWrapper,
  ProfileImage,
  PushToEnd,
  ScreenWrapper,
  StyledScrollView,
  StyledText,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import {RootStackParamList, ROOT_ROUTES} from '../../navigation/typing';
import {orders} from './data';
import {OrderItemImage} from './styles';

const order = orders[0];

type OrderDetailsNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  ROOT_ROUTES.ORDER_DETAILS
>;

const OrderDetails = () => {
  const theme = useTheme();
  const navigation = useNavigation<OrderDetailsNavigationProps['navigation']>();
  const [promptModal, setPromptModal] = React.useState<
    'call' | 'sms' | undefined
  >();
  const CallAndSMSModal = useCallAndSMS(
    navigation,
    promptModal,
    setPromptModal,
    '+2349067586542',
  );

  return (
    <KeyboardAwareScrollView>
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <CallAndSMSModal />
      <SafeAreaView>
        <CenteredHeaderTitle
          title="Order Details"
          addBackText={false}
          mode="primary"
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        <StyledScrollView>
          <VerticalWrapper fill align="flex-start">
            <HorizontalWrapper justify="space-between" fill>
              <StyledText
                fontWeight={400}
                fontSize={theme.fontSizes.tiny}
                color={theme.palette.tertiary.grey310}>
                Yesterday
              </StyledText>
              <Spacing size={MARGIN_SIZES.small} />
              <StyledText
                fontWeight={400}
                fontSize={theme.fontSizes.tiny}
                color={theme.palette.tertiary.grey310}>
                {order.startTime} PM - {order.endTime} PM
              </StyledText>
            </HorizontalWrapper>
            <Spacing direction="vertical" />
            <StyledText
              fontWeight={700}
              fontSize={theme.fontSizes.small}
              color={theme.palette.primary.blue900}>
              Order ID: # {order.orderId}
            </StyledText>
            <Spacing direction="vertical" size={MARGIN_SIZES.small} />
            <HorizontalWrapper fill align="flex-start">
              <Icon
                name={ICON_NAME.locationSelector}
                color={theme.palette.success}
                size={30}
              />
              <StyledText
                fontWeight={400}
                fontSize={theme.fontSizes.small}
                color={theme.palette.tertiary.grey320}
                marginLeft={10}>
                {order.location[0].pickupLocation}
              </StyledText>
            </HorizontalWrapper>
            <Spacing direction="vertical" size={MARGIN_SIZES.small} />
            <HorizontalWrapper fill align="flex-start">
              <Icon
                name={ICON_NAME.locationPointer}
                color={theme.palette.primary.blue}
                size={28}
              />
              <FlexItemView>
                <VerticalWrapper align="flex-start" justify="flex-start">
                  <StyledText
                    fontWeight={400}
                    fontSize={theme.fontSizes.small}
                    color={theme.palette.tertiary.grey320}
                    marginLeft={10}>
                    {order.location[0].deliveredLocation}
                  </StyledText>
                  <Spacing direction="vertical" />
                  <StyledText
                    fontWeight={500}
                    fontSize={theme.fontSizes.small}
                    color={theme.palette.primary.blue900}
                    marginLeft={10}>
                    Tracking ID: 2111020
                  </StyledText>
                  <Spacing direction="vertical" />
                  <StyledText
                    fontWeight={400}
                    fontSize={theme.fontSizes.tiny}
                    color={theme.palette.tertiary.grey320}
                    marginLeft={10}>
                    Received by: Arausi Daniel - 09198324454
                  </StyledText>
                </VerticalWrapper>
              </FlexItemView>
            </HorizontalWrapper>
          </VerticalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <HorizontalWrapper fill align="flex-start">
            <OrderItemImage
              source={require('../../assets/images/product_tile.png')}
            />
            <Spacing size={MARGIN_SIZES.small} />
            <VerticalWrapper justify="flex-start" align="flex-start">
              <StyledText
                fontWeight={400}
                fontSize={theme.fontSizes.tiny}
                color={theme.palette.tertiary.grey310}
                marginBottom={4}>
                Electronics
              </StyledText>
              <StyledText
                fontWeight={400}
                fontSize={theme.fontSizes.body}
                color={theme.palette.primary.blue900}
                marginBottom={4}>
                Sony HD Television
              </StyledText>
            </VerticalWrapper>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          <HorizontalWrapper justify="space-between">
            <StyledText
              fontWeight={400}
              fontSize={theme.fontSizes.tiny}
              color={theme.palette.tertiary.grey320}>
              Subtotal (1 item)
            </StyledText>
            <StyledText
              fontWeight={400}
              fontSize={theme.fontSizes.tiny}
              color={theme.palette.tertiary.grey320}
              marginBottom={4}>
              NGN 3000
            </StyledText>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          <HorizontalWrapper justify="space-between">
            <StyledText
              fontWeight={400}
              fontSize={theme.fontSizes.tiny}
              color={theme.palette.tertiary.grey320}>
              Shipping Fee
            </StyledText>
            <StyledText
              fontWeight={400}
              fontSize={theme.fontSizes.tiny}
              color={theme.palette.tertiary.grey320}
              marginBottom={4}>
              NGN 1000
            </StyledText>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          <HorizontalWrapper justify="space-between">
            <StyledText
              fontWeight={700}
              fontSize={theme.fontSizes.tiny}
              color={theme.palette.secondary.orange}>
              Total (Cash on Delivery)
            </StyledText>
            <StyledText
              fontWeight={700}
              fontSize={theme.fontSizes.tiny}
              color={theme.palette.secondary.orange}
              marginBottom={4}>
              NGN 4000
            </StyledText>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <HorizontalWrapper fill>
            <ProfileImage
              size={70}
              source={require('../../assets/images/profile.jpeg')}
            />
            <Spacing size={MARGIN_SIZES.small} />
            <VerticalWrapper justify="flex-start" align="flex-start">
              <StyledText
                fontWeight={700}
                fontSize={theme.fontSizes.body}
                color={theme.palette.tertiary.grey320}
                marginBottom={4}>
                Emmanuel Kokoma (Rider)
              </StyledText>
              <HorizontalWrapper>
                <Icon
                  name={ICON_NAME.star}
                  color={theme.palette.primary.blue}
                />
                <StyledText
                  fontWeight={400}
                  fontSize={theme.fontSizes.body}
                  color={theme.palette.tertiary.grey320}
                  marginLeft={5.5}>
                  4.5
                </StyledText>
              </HorizontalWrapper>
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
          <Spacing direction="vertical" size={MARGIN_SIZES.big} />
          <Button type={BUTTON_TYPES.ghost} text="Rate Order" fill />
        </StyledScrollView>
      </SafeAreaView>
    </ScreenWrapper>
    </KeyboardAwareScrollView>
  );
};

export default OrderDetails;
