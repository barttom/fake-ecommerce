import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {AuthForm} from '../Auth/AuthForm';
import {CheckoutForm} from './CheckoutForm';

export type CheckoutUserDataProps = {onUserDataSubmit: () => void};

export const CheckoutUserData = ({onUserDataSubmit}: CheckoutUserDataProps) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.form}>
        <Text variant="headlineMedium" style={[styles.label, styles.heading]}>
          Checkout
        </Text>
        <Text variant="labelMedium" style={[styles.label, styles.topLabel]}>
          --- Login to continue checkout ---
        </Text>
        <AuthForm />
        <Text variant="labelMedium" style={[styles.label, styles.bottomLabel]}>
          --- or fill the form ---
        </Text>
        <CheckoutForm onSubmit={onUserDataSubmit} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {paddingTop: 24, paddingVertical: 8, flex: 1},
  form: {flex: 1},
  label: {
    textAlign: 'center',
  },
  topLabel: {
    marginBottom: 8,
  },
  bottomLabel: {
    marginTop: 8,
    marginBottom: 16,
  },
  heading: {
    marginBottom: 12,
  },
});
