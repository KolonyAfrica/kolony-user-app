import React from 'react';
import {
  Animated,
  Easing,
  RefreshControl,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {
  CenteredHeaderTitle,
  Icon,
  ICON_NAME,
  MARGIN_SIZES,
  Spacing,
} from '../../components/shared';
import {
  FlexItemView,
  HorizontalWrapper,
  PushToEnd,
  ScreenWrapper,
  sharedType,
  StyledText,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import {NotificationBox, NotificationIconBox} from './styles';
import {
  Notification,
  NotificationDateHeader,
  NotificationItemProps,
  NotificationItemsType,
  NotificationListProps,
  NOTIFICATION_TYPES,
} from './typings';
import {notifications as notificationItems} from './data';
import utils from '../../components/shared/common/utils';

const icon = {
  [NOTIFICATION_TYPES.LANDMARK_CROSSED]: ICON_NAME.flag,
  [NOTIFICATION_TYPES.NEW_MESSAGE]: ICON_NAME.message,
  [NOTIFICATION_TYPES.PACKAGE_DROPPED]: ICON_NAME.box,
  [NOTIFICATION_TYPES.RIDER_ARRIVAL]: ICON_NAME.truckIcon,
};

//Todo add screen map for notification type

const NotificationItem = React.memo((props: NotificationItemProps) => {
  const theme = useTheme();
  const expandValue = React.useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handlePress = () => {
    if (props.content) {
      if (!expanded) {
        Animated.timing(expandValue, {
          toValue: 1,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }).start(() => {
          setExpanded(true);
        });
      } else {
        Animated.timing(expandValue, {
          toValue: 0,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }).start(() => {
          setExpanded(false);
        });
      }
    } else {
      //go to another screen hmm... maybe
    }
  };

  const itemHeightStyle = expandValue.interpolate({
    inputRange: [0, 1],
    outputRange: [68, 120],
  });

  const arrowRotateStyle = expandValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  const contentOpacityStyle = expandValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const contentStyle = {opacity: contentOpacityStyle, width: '90%'};

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <NotificationBox style={{maxHeight: itemHeightStyle}}>
        <HorizontalWrapper fill align="flex-start">
          <FlexItemView>
            <NotificationIconBox screenType={props.screenType}>
              <Icon
                name={icon[props.type]}
                size={24}
                color={
                  props.screenType === 'primary'
                    ? theme.palette.primary.blue
                    : theme.palette.secondary.orange
                }
              />
            </NotificationIconBox>
            <Spacing size={MARGIN_SIZES.small} />
          </FlexItemView>
          <FlexItemView flex={4}>
            <VerticalWrapper align="flex-start" fill>
              <HorizontalWrapper justify="space-between" fill>
                <StyledText
                  fontWeight={500}
                  fontSize={theme.fontSizes.small}
                  fontFamily={theme.fontTypes.body}
                  color={theme.palette.tertiary.grey440}
                  marginBottom={2}>
                  {props.title}
                </StyledText>
                <PushToEnd pos="right" />
                {props.content ? (
                  <Icon
                    name={ICON_NAME.arrowCircle}
                    size={18}
                    color={theme.palette.primary.blue500}
                    direction="down"
                    style={{
                      transform: [
                        {
                          rotate: arrowRotateStyle as any,
                        },
                      ],
                    }}
                  />
                ) : null}
              </HorizontalWrapper>
              <StyledText
                fontWeight={400}
                fontSize={theme.fontSizes.tiny}
                fontFamily={theme.fontTypes.body}
                color={theme.palette.tertiary.grey310}
                marginBottom={4}>
                {props.date}
              </StyledText>
              {props.content && expanded ? (
                <Animated.View style={contentStyle}>
                  <StyledText
                    fontWeight={400}
                    fontSize={theme.fontSizes.small}
                    fontFamily={theme.fontTypes.body}
                    color={theme.palette.tertiary.grey320}
                    marginBottom={4}>
                    {props.content}
                  </StyledText>
                </Animated.View>
              ) : null}
            </VerticalWrapper>
          </FlexItemView>
        </HorizontalWrapper>
      </NotificationBox>
    </TouchableWithoutFeedback>
  );
});

const EmptyList = React.memo(() => {
  const theme = useTheme();
  return (
    <VerticalWrapper fill>
      <Spacing direction="vertical" size={MARGIN_SIZES.big} />
      <Icon name={ICON_NAME.emptyMessages} />
      <Spacing direction="vertical" size={MARGIN_SIZES.large} />
      <StyledText
        color={theme.palette.primary.blue900}
        fontSize={theme.fontSizes.h2}
        fontWeight={700}
        marginBottom={theme.margin.small2}>
        No New Notifications
      </StyledText>
      <StyledText
        color={theme.palette.tertiary.grey310}
        fontSize={theme.fontSizes.body}
        fontWeight={400}>
        Your notifications will appear here
      </StyledText>
      <Spacing direction="vertical" size={MARGIN_SIZES.big} />
      <Spacing direction="vertical" size={MARGIN_SIZES.big} />
      <Spacing direction="vertical" size={MARGIN_SIZES.big} />
      <Spacing direction="vertical" size={MARGIN_SIZES.big} />
    </VerticalWrapper>
  );
});

const NotificationList: React.FC<NotificationListProps> = React.memo(
  ({items, screenType, onRefresh}) => {
    const theme = useTheme();
    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    const parsedNotifications = React.useCallback(() => {
      let allNotifications = [] as Array<Notification | NotificationDateHeader>;
      for (let section in items) {
        allNotifications = [
          ...allNotifications,
          {text: section, id: `${section}-${section.length}`},
          ...items[section],
        ];
      }
      return allNotifications;
    }, [items]);

    const notifications = parsedNotifications();
    //Todo scroll to the bottom when expanded version is cut off
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh(setRefreshing)}
          />
        }>
        {notifications.length ? (
          notifications.map(notification => {
            if ('date' in notification) {
              return (
                <NotificationItem
                  key={notification.id}
                  screenType={screenType}
                  {...notification}
                />
              );
            } else {
              return (
                <HorizontalWrapper fill key={notification.id}>
                  <StyledText
                    fontWeight={700}
                    fontSize={theme.fontSizes.body}
                    fontFamily={theme.fontTypes.body}
                    color={theme.palette.tertiary.grey440}
                    marginTop={theme.padding.medium}
                    marginBottom={theme.padding.medium}>
                    {utils.capitalize(notification.text)}
                  </StyledText>
                  <Spacing direction="vertical" />
                </HorizontalWrapper>
              );
            }
          })
        ) : (
          <EmptyList />
        )}
      </ScrollView>
    );
  },
);

const NotificationScreen: React.FC<{screenType: sharedType}> = ({
  screenType,
}) => {
  const [notifications, setNotifications] = React.useState<
    NotificationItemsType | {}
  >({});

  const onRefresh = React.useCallback(
    (setRefreshing: React.Dispatch<React.SetStateAction<boolean>>) => {
      //Todo remove setTimeout with actual fetch logic
      setRefreshing(true);
      utils.wait(3000).then(() => {
        setNotifications(notificationItems);
        setRefreshing(false);
      });
    },
    [],
  );

  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <CenteredHeaderTitle
          title="Notifications"
          addBackText={false}
          mode="primary"
        />
        <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
        <NotificationList
          items={notifications}
          screenType={screenType}
          onRefresh={onRefresh}
        />
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default NotificationScreen;
