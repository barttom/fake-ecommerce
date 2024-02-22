import React, {useState} from 'react';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {useAppDispatch} from '../../common/redux';
import {clearCart} from '../Cart';
import {CheckoutConfirmMessage} from './CheckoutConfirmMessage';
import {CheckoutUserData} from './CheckoutUserData';
import {CheckoutPayment} from './CheckoutPayment';
type OrderStatus = 'deliveryData' | 'payment' | 'success';

export const CheckoutScreen = () => {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('deliveryData');
  const dispatch = useAppDispatch();
  const finishOrder = () => {
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
