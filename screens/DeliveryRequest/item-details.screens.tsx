import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  BaseTextInput,
  Button,
  BUTTON_TYPES,
  DeliveryFlow,
  Dropdown,
  Icon,
  ICON_NAME,
  INPUT_MODES,
  Label,
  MARGIN_SIZES,
} from '../../components/shared';
import {
  CenteredTitle,
  FlexItemView,
  HorizontalWrapper,
  ScreenWrapper,
  StyledScrollView,
  SubScreenTitle,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import GoBack from '../../components/shared/GoBack';
import Spacing from '../../components/shared/Spacing';
import {RootStackParamList, ROOT_ROUTES} from '../../navigation/typing';
import {deliveryRequestTitles, itemCategories} from './data';
import {
  ImageIconBox,
  ImagePickerBox,
  ImagePickerText,
  ItemCategoryBox,
  ItemCategoryText,
} from './styles';

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  ROOT_ROUTES.ITEM_DETAILS
>;

const ItemDetails = () => {
  const navigation = useNavigation<NavigationProps['navigation']>();
  const route = useRoute<NavigationProps['route']>();
  const [selectedItemCategory, setSelectedItemCategory] =
    React.useState<string>('');
  const theme = useTheme();

  const handleImageSelection = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    console.log('result', result);
  };

  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <StyledScrollView showsVerticalScrollIndicator={false}>
          <HorizontalWrapper>
            <GoBack showText={false} mode="primary" />
            <FlexItemView>
              <HorizontalWrapper justify="center">
                <CenteredTitle>Single Delivery</CenteredTitle>
              </HorizontalWrapper>
            </FlexItemView>
          </HorizontalWrapper>
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <DeliveryFlow
            titles={deliveryRequestTitles}
            customIndex={route.params.progress ?? 1}
          />
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <SubScreenTitle>Item Details</SubScreenTitle>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          <BaseTextInput
            label="Item Name"
            placeholder="IPhone 13 Mini"
            mode={INPUT_MODES.default}
            fill
          />
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          <VerticalWrapper align="flex-start" justify="flex-start">
            <Label>Item Category</Label>
            <Spacing direction="vertical" />
            <Dropdown
              onSelect={({value}) => setSelectedItemCategory(value)}
              data={itemCategories}>
              <ItemCategoryBox>
                <ItemCategoryText selected={!!selectedItemCategory.length}>
                  {selectedItemCategory || 'Phones & Accessories'}
                </ItemCategoryText>
                <Icon
                  name={ICON_NAME.arrow}
                  direction="down"
                  color={theme.palette.tertiary.grey310}
                />
              </ItemCategoryBox>
            </Dropdown>
          </VerticalWrapper>

          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          <BaseTextInput
            label="Item Value"
            placeholder="N500,000.00"
            mode={INPUT_MODES.default}
            fill
          />
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          <BaseTextInput
            label="Item Quantity"
            placeholder="3"
            keyboardType="numeric"
            mode={INPUT_MODES.default}
            fill
          />
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          <ImagePickerBox onPress={handleImageSelection}>
            <ImageIconBox>
              <Icon name={ICON_NAME.image} />
            </ImageIconBox>
            <FlexItemView>
              <ImagePickerText>Upload an image of the item</ImagePickerText>
            </FlexItemView>
          </ImagePickerBox>
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          <BaseTextInput
            label="Delivery Note (Optional)"
            placeholder="Any specific details for the delivery"
            mode={INPUT_MODES.default}
            multiline
            numberOfLines={4}
            fill
          />
          <Spacing direction="vertical" size={MARGIN_SIZES.small2} />
          <Button
            type={BUTTON_TYPES.primary}
            text="Continue"
            fill
            onPress={() =>
              navigation.navigate(ROOT_ROUTES.SELECT_PICKUP_TYPE, {
                ...route.params,
              })
            }
          />
        </StyledScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default ItemDetails;
