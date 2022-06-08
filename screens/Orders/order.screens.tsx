import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {
  BaseTextInput,
  Button,
  BUTTON_TYPES,
  CenteredHeaderTitle,
  Icon,
  ICON_NAME,
  INPUT_MODES,
  MARGIN_SIZES,
  Spacing,
} from '../../components/shared';
import {
  HorizontalWrapper,
  ScreenWrapper,
  StyledScrollView,
  StyledText,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import {OrderItemBox} from './styles';

type OrderNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabStackParamList, 'Order'>,
  NativeStackScreenProps<RootStackParamList>
>;

//dummy data
import {orders as orderData} from './data';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  MainTabStackParamList,
  RootStackParamList,
  ROOT_ROUTES,
} from '../../navigation/typing';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const EmptyList = React.memo(() => {
  const theme = useTheme();
  return (
    <VerticalWrapper fill>
      <Spacing direction="vertical" size={MARGIN_SIZES.big} />
      <Icon name={ICON_NAME.openBox} />
      <Spacing direction="vertical" size={MARGIN_SIZES.large} />
      <StyledText
        color={theme.palette.primary.blue900}
        fontSize={theme.fontSizes.h2}
        fontWeight={700}
        marginBottom={theme.margin.small2}>
        No Order History
      </StyledText>
      <StyledText
        color={theme.palette.tertiary.grey310}
        fontSize={theme.fontSizes.body}
        fontWeight={400}
        textAlign="center">
        Make orders to change the history of your Kolony with just a click!
      </StyledText>
      <Spacing direction="vertical" size={MARGIN_SIZES.large} />
      <Button type={BUTTON_TYPES.primary} text="Request Pickup" fill />
      <Spacing direction="vertical" size={MARGIN_SIZES.large} />
    </VerticalWrapper>
  );
});

const OrderItem: React.FC<{order: any}> = React.memo(({order}) => {
  const theme = useTheme();
  const navigation = useNavigation<OrderNavigationProps['navigation']>();

  const navigateToOrderDetails = React.useCallback(() => {
    navigation.navigate(ROOT_ROUTES.ORDER_DETAILS);
  }, [navigation]);

  return (
    <OrderItemBox onPress={navigateToOrderDetails}>
      <VerticalWrapper fill align="flex-start">
        <HorizontalWrapper justify="space-between" fill>
          <StyledText
            fontWeight={400}
            fontSize={theme.fontSizes.tiny}
            color={theme.palette.secondary.orange}>
            {order.itemName}
          </StyledText>
          <Icon
            name={ICON_NAME.arrow}
            direction="right"
            size={18}
            color={theme.palette.tertiary.grey430}
          />
        </HorizontalWrapper>
        <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        <HorizontalWrapper justify="space-between" fill>
          <StyledText
            fontWeight={700}
            fontSize={theme.fontSizes.small}
            color={theme.palette.primary.blue900}>
            Order ID: # {order.orderId}
          </StyledText>
          <StyledText
            fontWeight={700}
            fontSize={theme.fontSizes.small}
            color={theme.palette.primary.blue900}>
            NGN {order.price}
          </StyledText>
        </HorizontalWrapper>
        <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        <HorizontalWrapper fill>
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
        <HorizontalWrapper fill>
          <Icon
            name={ICON_NAME.locationPointer}
            color={theme.palette.primary.blue}
            size={28}
          />
          <StyledText
            fontWeight={400}
            fontSize={theme.fontSizes.small}
            color={theme.palette.tertiary.grey320}
            marginLeft={10}>
            {order.location[0].deliveredLocation}
          </StyledText>
        </HorizontalWrapper>
        <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        {order.location.length > 1 ? (
          <VerticalWrapper fill>
            <StyledText
              fontWeight={400}
              fontSize={theme.fontSizes.tiny}
              color={theme.palette.tertiary.grey420}
              textAlign="center">
              2 more delivery locations
            </StyledText>
            <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          </VerticalWrapper>
        ) : null}
        <HorizontalWrapper>
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
      </VerticalWrapper>
    </OrderItemBox>
  );
});

const OrderList: React.FC<{orders: any[]}> = React.memo(({orders}) => {
  const theme = useTheme();
  return (
    <StyledScrollView showsVerticalScrollIndicator={false}>
      <Spacing direction="vertical" size={MARGIN_SIZES.small} />
      <BaseTextInput
        placeholder="Search by date, keyword..."
        mode={INPUT_MODES.default}
        fill
        leftIcon={() => (
          <Icon
            name={ICON_NAME.search}
            color={theme.palette.secondary.orange410}
          />
        )}
        borderColor="transparent"
        bgColor={theme.palette.secondary.orange160}
      />
      <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
      {orders.map((order, index) => (
        <OrderItem order={order} key={index} />
      ))}
    </StyledScrollView>
  );
});

const Order = () => {
  const [orders] = React.useState(() => orderData);
  return (
    <ScreenWrapper>
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <CenteredHeaderTitle
          title="Order History"
          addBackText={false}
          mode="primary"
        />
        {!orders.length ? <EmptyList /> : <OrderList orders={orders} />}
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Order;
