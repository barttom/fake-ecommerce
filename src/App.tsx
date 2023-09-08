import React from 'react';
import {
  LogBox,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {PaperProvider, MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {RootNavigator} from './common/components/Navigator';
import {initialStore} from './common/redux';
import {colorsDark, colorsLight} from './common/theme/colors';

// For presentation purposes, to avoid logs to be on the screen when running E2E tests
LogBox.ignoreAllLogs(true);

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const theme = isDarkMode
    ? {...MD3DarkTheme, colors: colorsDark}
    : {...MD3LightTheme, colors: colorsLight};

  return (
    <Provider store={initialStore}>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={theme.colors.surface}
          />
          <NavigationContainer>
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
