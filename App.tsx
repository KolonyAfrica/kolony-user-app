import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {ThemeProvider} from 'styled-components';
import {theme} from './components/shared/theme';
import Navigation from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEYS} from './constants';

export const AppContext = React.createContext<{showOnBoarding: boolean}>({
  showOnBoarding: false,
});

const App = () => {
  const [showOnBoarding, setShowOnBoarding] = React.useState<boolean>(false);

  const setup = async () => {
    try {
      const hasVisited = await AsyncStorage.getItem(
        STORAGE_KEYS.userHasVisitedApp,
      );
      setShowOnBoarding(() => !(!!hasVisited && hasVisited === 'True'));
    } catch (err) {
    } finally {
      SplashScreen.hide();
    }
  };

  React.useEffect(() => {
    (async () => await setup())();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{showOnBoarding}}>
        <Navigation />
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
