import React from 'react';
import {LogBox, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {PaperProvider, MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootNavigator} from './common/components/Navigator';
import {initialStore} from './common/redux';
import {colorsDark, colorsLight} from './common/theme/colors';

// For presentation purposes, to avoid logs to be on the screen when running E2E tests
LogBox.ignoreAllLogs(true);

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = isDarkMode ? colorsDark : colorsLight;
  const theme = isDarkMode
    ? {...MD3DarkTheme, colors}
    : {...MD3LightTheme, colors};

  const navigationTheme = {
    dark: isDarkMode,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.background,
      text: colors.onBackground,
      border: colors.outline,
      notification: colors.onBackground,
    },
  };

  return (
    <Provider store={initialStore}>
      <PaperProvider theme={theme}>
        <SafeAreaView
          style={[styles.container, {backgroundColor: colors.background}]}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={colors.background}
            translucent
          />

          <NavigationContainer theme={navigationTheme}>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
