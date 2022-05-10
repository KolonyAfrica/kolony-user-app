import React from 'react';
import {FlatList, StatusBar} from 'react-native';
import {useTheme} from 'styled-components';
import {
  BaseTextInput,
  Button,
  BUTTON_SIZE,
  BUTTON_TYPES,
  Icon,
  ICON_NAME,
  INPUT_MODES,
  MARGIN_SIZES,
} from '../../components/shared';
import {
  FlexItemView,
  HorizontalWrapper,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import Spacing from '../../components/shared/Spacing';
import {recentActivities} from './data';
import {
  DeliveryOption,
  Description,
  DeliveryOptionHeading,
  DeliveryOptionsBox,
  HomeDescText,
  HomeIntroBox,
  HomeWrapper,
  LastActivityBox,
  ProfileImage,
  UserName,
  LastActivityTitle,
  LastActivityItem,
  LastActivityItemHeader,
  LastActivityItemDateText,
  LastActivityItemDescription,
} from './styles';

const Home = () => {
  const theme = useTheme();
  return (
    <HomeWrapper>
      <StatusBar barStyle="light-content" />
      <HomeIntroBox>
        <HorizontalWrapper justify="space-between">
          <VerticalWrapper align="flex-start">
            <UserName>Hello, Daniel</UserName>
            <Spacing direction="vertical" />
            <HomeDescText>This is your Kolony, make orders!</HomeDescText>
          </VerticalWrapper>
          <ProfileImage source={require('../../assets/images/profile.jpeg')} />
        </HorizontalWrapper>
        <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        <HorizontalWrapper justify="space-between">
          <FlexItemView flex={2}>
            <BaseTextInput
              placeholder="Enter tracking ID"
              autoFocus
              autoCorrect={false}
              autoCapitalize="none"
              mode={INPUT_MODES.default}
              fill
            />
          </FlexItemView>
          <Spacing size={MARGIN_SIZES.small} />
          <FlexItemView>
            <Button
              type={BUTTON_TYPES.primary}
              text="Track"
              fill
              size={BUTTON_SIZE.medium}
            />
          </FlexItemView>
        </HorizontalWrapper>
      </HomeIntroBox>
      <DeliveryOptionsBox>
        <DeliveryOption>
          <HorizontalWrapper justify="space-between">
            <HorizontalWrapper>
              <Icon name={ICON_NAME.singleDelivery} />
              <Spacing size={MARGIN_SIZES.small} />
              <VerticalWrapper align="flex-start">
                <DeliveryOptionHeading>Single Delivery</DeliveryOptionHeading>
                <Description>Request for pickup</Description>
              </VerticalWrapper>
            </HorizontalWrapper>
            <Icon
              name={ICON_NAME.arrow}
              direction="right"
              color={theme.palette.tertiary.grey410}
            />
          </HorizontalWrapper>
        </DeliveryOption>
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <DeliveryOption>
          <HorizontalWrapper justify="space-between">
            <HorizontalWrapper>
              <Icon name={ICON_NAME.multipleDelivery} />
              <Spacing size={MARGIN_SIZES.small} />
              <VerticalWrapper align="flex-start">
                <DeliveryOptionHeading>Multiple Delivery</DeliveryOptionHeading>
                <Description>Request for multiple pickup</Description>
              </VerticalWrapper>
            </HorizontalWrapper>
            <Icon
              name={ICON_NAME.arrow}
              direction="right"
              color={theme.palette.tertiary.grey410}
            />
          </HorizontalWrapper>
        </DeliveryOption>
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <DeliveryOption>
          <HorizontalWrapper justify="space-between">
            <HorizontalWrapper>
              <Icon name={ICON_NAME.tracking} />
              <Spacing size={MARGIN_SIZES.small} />
              <VerticalWrapper align="flex-start">
                <DeliveryOptionHeading>Tracking</DeliveryOptionHeading>
                <Description>Track your product in real-time</Description>
              </VerticalWrapper>
            </HorizontalWrapper>
            <Icon
              name={ICON_NAME.arrow}
              direction="right"
              color={theme.palette.tertiary.grey410}
            />
          </HorizontalWrapper>
        </DeliveryOption>
      </DeliveryOptionsBox>
      <LastActivityBox>
        <LastActivityTitle>Last Activity</LastActivityTitle>
        <Spacing direction="vertical" size={MARGIN_SIZES.small} />
        <FlatList
          data={recentActivities}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <>
              <LastActivityItem>
                <VerticalWrapper align="flex-start">
                  <LastActivityItemHeader>{item.title}</LastActivityItemHeader>
                  <HorizontalWrapper>
                    <Icon name={ICON_NAME.clock} />
                    <LastActivityItemDateText>
                      {item.date}
                    </LastActivityItemDateText>
                  </HorizontalWrapper>
                </VerticalWrapper>
                <VerticalWrapper align="flex-start">
                  <LastActivityItemDescription>
                    {item.deliveryType}
                  </LastActivityItemDescription>
                  <LastActivityItemDescription>
                    {item.description}
                  </LastActivityItemDescription>
                </VerticalWrapper>
              </LastActivityItem>
              <Spacing size={MARGIN_SIZES.small} />
            </>
          )}
          keyExtractor={item => item.id}
        />
      </LastActivityBox>
    </HomeWrapper>
  );
};

export default Home;
