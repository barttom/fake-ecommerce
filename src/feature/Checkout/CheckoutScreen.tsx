import React, {useState} from 'react';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {useAppDispatch} from '../../common/redux';
import {clearCart} from '../Cart';
import {CheckoutConfirmMessage} from './CheckoutConfirmMessage';
import {CheckoutUserData} from './CheckoutUserData';

export const CheckoutScreen = () => {
  const [isOrdered, setIsOrdered] = useState(false);
  const dispatch = useAppDispatch();
  const handleOnSubmit = () => {
    dispatch(clearCart());
    setIsOrdered(true);
  };

  return (
    <ScreenRollupWrapper isLoading={false} animationDuration={0}>
      {isOrdered ? (
        <CheckoutConfirmMessage />
      ) : (
        <CheckoutUserData onUserDataSubmit={handleOnSubmit} />
      )}
    </ScreenRollupWrapper>
  );
};
