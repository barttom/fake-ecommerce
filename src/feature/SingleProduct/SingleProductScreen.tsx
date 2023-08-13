import React from 'react';
import {useRoute} from '@react-navigation/native';
import {SingleProductScreenParams} from '../../common/components/Navigator';

export const SingleProductScreen = () => {
  const {params} = useRoute<SingleProductScreenParams['route']>();
  console.log(params.productId);

  return <></>;
};
