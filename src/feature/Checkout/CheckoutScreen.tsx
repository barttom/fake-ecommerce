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
import {setDeliveryData} from '../Settings';
import {addOrderItem} from '../Orders/';
import {selectDeliveryData} from '../Settings/settingsSelectors';
import {CheckoutConfirmMessage} from './CheckoutConfirmMessage';
import {CheckoutUserData} from './CheckoutUserData';
import {CheckoutPayment} from './CheckoutPayment';
import {CheckoutFormFields} from './CheckoutForm';

type ProcessStatus = 'deliveryData' | 'payment' | 'success';

export const CheckoutScreen = () => {
  const [processStatus, setProcessStatus] =
    useState<ProcessStatus>('deliveryData');
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const deliveryData = useAppSelector(selectDeliveryData);
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

    dispatch(
      addOrderItem({
        items: cartItems,
        deliveryData,
      }),
    );

    dispatch(clearCart());

    setProcessStatus('success');
  };

  const goToPayment = (values: CheckoutFormFields) => {
    dispatch(
      setDeliveryData({
        address: values.street,
        email: values.email,
        phone: values.phone,
        firstName: values.name,
        lastName: values.surname,
        postalCode: values.postcode,
        city: values.city,
      }),
    );
    setProcessStatus('payment');
  };

  return (
    <ScreenRollupWrapper withoutAnimation>
      {(() => {
        switch (processStatus) {
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
