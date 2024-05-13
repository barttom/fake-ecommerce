import React, {useState} from 'react';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import {Alert} from 'react-native';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {useAppDispatch, useAppSelector} from '../../common/redux';
import {clearCart, selectCartItems} from '../Cart';
import {useIntentsMutation} from '../../common/api';
import {CheckoutConfirmMessage} from './CheckoutConfirmMessage';
import {CheckoutUserData} from './CheckoutUserData';
import {CheckoutPayment} from './CheckoutPayment';
type OrderStatus = 'deliveryData' | 'payment' | 'success';

export const CheckoutScreen = () => {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('deliveryData');
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );

  const [createPaymentIntent] = useIntentsMutation();
  const finishOrder = async () => {
    const paymentIntentResponse = await createPaymentIntent({
      amount: Math.floor(totalPrice * 100),
    });
    if ('error' in paymentIntentResponse) {
      console.log(paymentIntentResponse.error);
      Alert.alert('Something went wrong');
      return;
    }

    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'fakeEcommerce',
      paymentIntentClientSecret: paymentIntentResponse.data.paymentIntent,
      style: 'automatic',
    });

    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Something went wrong');
      return;
    }

    const paymentResponse = await presentPaymentSheet();

    console.log('paymentResponse', paymentResponse);

    if (paymentResponse.error) {
      if (paymentResponse.error.code === 'Canceled') {
        return;
      }

      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message,
      );
      return;
    }

    dispatch(clearCart());
    setOrderStatus('success');
  };

  const goToPayment = () => {
    setOrderStatus('payment');
  };

  return (
    <ScreenRollupWrapper withoutAnimation>
      {(() => {
        switch (orderStatus) {
          case 'payment':
            return <CheckoutPayment onFinish={finishOrder} />;
          case 'success':
            return <CheckoutConfirmMessage />;
          case 'deliveryData':
          default:
            return <CheckoutUserData onUserDataSubmit={goToPayment} />;
        }
      })()}
    </ScreenRollupWrapper>
  );
};
