import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {PaperProvider, MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {RootNavigator} from './common/components/Navigator';
import {store} from './common/redux';
import {colorsDark, colorsLight} from './common/theme/colors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const theme = isDarkMode
    ? {...MD3DarkTheme, colors: colorsDark}
    : {...MD3LightTheme, colors: colorsLight};

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
}

export default App;
