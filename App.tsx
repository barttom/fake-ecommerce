import React from 'react';
import {SafeAreaView, StatusBar, Text, useColorScheme} from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>fake-ecommerce</Text>
    </SafeAreaView>
  );
}

export default App;
