import React from 'react';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from '../Navigator';
import {colorsDark, colorsLight} from '../../theme/colors';
import {useAppSelector} from '../../redux';
import {selectTheme} from '../../../feature/Settings/settingsSelectors';

export const Bootstrap = () => {
  const deviceTheme = useAppSelector(selectTheme);
  const colorScheme = useColorScheme();
  const currentMode = deviceTheme === 'auto' ? colorScheme : deviceTheme;
  const isDarkMode = currentMode === 'dark';
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
