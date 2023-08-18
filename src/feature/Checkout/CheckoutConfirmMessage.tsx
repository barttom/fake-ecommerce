import React from 'react';
import LottieView from 'lottie-react-native';
import {Button, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {CartScreenProps} from '../../common/components/Navigator';

const checkmarkAnimation = require('../../../assets/checkmark-lottie.json');

export const CheckoutConfirmMessage = () => {
  const {navigate} = useNavigation<CartScreenProps['navigation']>();
  const handleFinish = () => navigate('Products');

  return (
    <View style={styles.wrapper}>
      <Text variant="headlineMedium">Your order has been finished</Text>
      <LottieView
        style={styles.animation}
        source={checkmarkAnimation}
        loop
        autoPlay
      />
      <Button mode="contained" onPress={handleFinish}>
        Back to the Products
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    flex: 1,
  },
  animation: {
    width: '100%',
    height: '50%',
  },
});
