import React, {useState} from 'react';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {useAppDispatch} from '../../common/redux';
import {clearCart} from '../Cart';
import {CheckoutForm} from './CheckoutForm';
import {CheckoutConfirmMessage} from './CheckoutConfirmMessage';

export const CheckoutScreen = () => {
  const [isOrdered, setIsOrdered] = useState(false);
  const dispatch = useAppDispatch();
  const handleOnSubmit = () => {
    dispatch(clearCart());
    setIsOrdered(true);
  };

  return (
    <ScreenRollupWrapper isLoading={false}>
      {isOrdered ? (
        <CheckoutConfirmMessage />
      ) : (
        <CheckoutForm onSubmit={handleOnSubmit} />
      )}
    </ScreenRollupWrapper>
  );
};
