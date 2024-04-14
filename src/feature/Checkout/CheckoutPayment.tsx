import React from 'react';
import {Button} from 'react-native-paper';

export type CheckoutPaymentProps = {onFinish: () => void};

export const CheckoutPayment = ({onFinish}: CheckoutPaymentProps) => {
  return <Button onPress={onFinish}>finish</Button>;
};
