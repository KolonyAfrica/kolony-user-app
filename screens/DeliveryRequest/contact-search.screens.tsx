import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {
  BaseTextInput,
  DeliveryFlow,
  Icon,
  ICON_NAME,
  INPUT_MODES,
  MARGIN_SIZES,
} from '../../components/shared';
import {
  CenteredTitle,
  FlexItemView,
  HorizontalWrapper,
  ScreenWrapper,
  StyledScrollView,
  VerticalWrapper,
} from '../../components/shared/common/styles';
import GoBack from '../../components/shared/GoBack';
import Spacing from '../../components/shared/Spacing';
import {RootStackParamList, ROOT_ROUTES} from '../../navigation/typing';
import {deliveryRequestTitles, searchResults} from './data';
import {
  CancelText,
  ContactEmptyHeader,
  ResultMainText,
  ResultSubText,
  SearchResult,
  SearchResultHeader,
} from './styles';

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  ROOT_ROUTES.CONTACT_SEARCH
>;

interface SearchResultListProps {
  results: {
    name: string;
    email: string;
    phone: string;
    location: {
      main: string;
      fullAddress: string;
    };
  }[];
}

const SearchResultList: React.FC<SearchResultListProps> = React.memo(
  ({results}) => {
    const theme = useTheme();
    const navigation = useNavigation<NavigationProps['navigation']>();
    const route = useRoute<NavigationProps['route']>();
    const goBackToPickDeliveryForm = () => {
      navigation.navigate(ROOT_ROUTES.PICKUP_AND_DELIVERY, {
        ...route.params,
      });
    };
    return (
      <VerticalWrapper align="flex-start">
        <VerticalWrapper align="flex-start">
          <SearchResultHeader>Contacts</SearchResultHeader>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          {results.map((contact, index) => (
            <SearchResult key={index} onPress={goBackToPickDeliveryForm}>
              <HorizontalWrapper>
                <Icon
                  name={ICON_NAME.user}
                  color={theme.palette.primary.blue}
                  size={20}
                />
                <Spacing size={MARGIN_SIZES.small} />
                <VerticalWrapper align="flex-start">
                  <ResultMainText>{contact.name}</ResultMainText>
                  <ResultSubText>{contact.email}</ResultSubText>
                </VerticalWrapper>
              </HorizontalWrapper>
            </SearchResult>
          ))}
        </VerticalWrapper>
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <VerticalWrapper align="flex-start">
          <SearchResultHeader>Locations</SearchResultHeader>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          {results.map((contact, index) => (
            <SearchResult key={index} onPress={goBackToPickDeliveryForm}>
              <HorizontalWrapper>
                <Icon
                  name={ICON_NAME.locationPointer}
                  color={theme.palette.primary.blue}
                  size={20}
                />
                <Spacing size={MARGIN_SIZES.small} />
                <VerticalWrapper align="flex-start">
                  <ResultMainText>{contact.location.main}</ResultMainText>
                  <ResultSubText>{contact.location.fullAddress}</ResultSubText>
                </VerticalWrapper>
              </HorizontalWrapper>
            </SearchResult>
          ))}
        </VerticalWrapper>
        <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
        <VerticalWrapper align="flex-start">
          <SearchResultHeader>Phone Numbers</SearchResultHeader>
          <Spacing direction="vertical" size={MARGIN_SIZES.small} />
          {results.map((contact, index) => (
            <SearchResult key={index} onPress={goBackToPickDeliveryForm}>
              <HorizontalWrapper>
                <Icon
                  name={ICON_NAME.call}
                  color={theme.palette.primary.blue}
                  size={20}
                />
                <Spacing size={MARGIN_SIZES.small} />
                <VerticalWrapper align="flex-start">
                  <ResultMainText>{contact.phone}</ResultMainText>
                  <ResultSubText>{contact.location.fullAddress}</ResultSubText>
                </VerticalWrapper>
              </HorizontalWrapper>
            </SearchResult>
          ))}
        </VerticalWrapper>
      </VerticalWrapper>
    );
  },
);

const EmptyResultList = React.memo(() => {
  return (
    <VerticalWrapper align="flex-start">
      <HorizontalWrapper>
        <Icon name={ICON_NAME.user} size={18} color="#828282" />
        <ContactEmptyHeader>Name</ContactEmptyHeader>
      </HorizontalWrapper>
      <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
      <HorizontalWrapper>
        <Icon name={ICON_NAME.call} size={18} color="#828282" />
        <ContactEmptyHeader>Phone</ContactEmptyHeader>
      </HorizontalWrapper>
      <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
      <HorizontalWrapper>
        <Icon name={ICON_NAME.locationPointer} size={20} color="#828282" />
        <ContactEmptyHeader>Location</ContactEmptyHeader>
      </HorizontalWrapper>
      <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
      <HorizontalWrapper>
        <Icon name={ICON_NAME.sms} />
        <ContactEmptyHeader>Email</ContactEmptyHeader>
      </HorizontalWrapper>
    </VerticalWrapper>
  );
});

const ContactSearch = () => {
  const theme = useTheme();
  const route = useRoute<NavigationProps['route']>();
  const navigation = useNavigation<NavigationProps['navigation']>();
  const [query, setQuery] = React.useState<string>('');
  const [results, setResults] = React.useState<
    SearchResultListProps['results']
  >([]);

  React.useEffect(() => {
    if (query.length) {
      const loweredCasedQuery = query.toLowerCase();
      setResults(
        searchResults.filter(
          data =>
            data.name.toLowerCase().includes(loweredCasedQuery) ||
            data.phone.includes(loweredCasedQuery) ||
            data.location.fullAddress.includes(loweredCasedQuery) ||
            data.location.main.includes(loweredCasedQuery),
        ),
      );
    } else {
      setResults([]);
    }
  }, [query]);

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
          <DeliveryFlow titles={deliveryRequestTitles} />
          <Spacing direction="vertical" size={MARGIN_SIZES.medium} />
          <HorizontalWrapper>
            <BaseTextInput
              placeholder="Search by name, phone, email..."
              mode={INPUT_MODES.disabled}
              leftIcon={() => <Icon name={ICON_NAME.search} />}
              bgColor={theme.palette.secondary.orange160}
              borderColor="transparent"
              marginBottom={MARGIN_SIZES.medium}
              onChangeText={text => setQuery(text)}
              autoFocus
              fill
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ROOT_ROUTES.PICKUP_AND_DELIVERY, {
                  ...route.params,
                })
              }>
              <CancelText>cancel</CancelText>
            </TouchableOpacity>
          </HorizontalWrapper>
          {results.length ? (
            <SearchResultList results={results} />
          ) : (
            <EmptyResultList />
          )}
        </StyledScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default ContactSearch;
