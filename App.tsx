import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {ThemeProvider} from 'styled-components';
import {theme} from './components/shared/theme';
import Navigation from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEYS} from './constants';

export const AppContext = React.createContext<{
  showOnBoarding: boolean | undefined;
}>({
  showOnBoarding: false,
});

const App = () => {
  const [showOnBoarding, setShowOnBoarding] = React.useState<
    boolean | undefined
  >();

  /**
   * Initial steps before app launch
   * 1. check if user is a visitor
   */
  const setup = async () => {
    try {
      /**check store to verify is user is a visitor */
      const hasVisited = await AsyncStorage.getItem(
        STORAGE_KEYS.userHasVisitedApp,
      );
      setShowOnBoarding(() => (hasVisited === 'True' ? false : true));
    } catch (err) {
    } finally {
      //no matter what don't keep user in splash screen
      SplashScreen.hide();
    }
  };

  React.useEffect(() => {
    (async () => await setup())();
  }, []);

  const showOnBoardingNotUndefined = showOnBoarding !== undefined;
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{showOnBoarding}}>
        {showOnBoardingNotUndefined ? <Navigation /> : null}
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
