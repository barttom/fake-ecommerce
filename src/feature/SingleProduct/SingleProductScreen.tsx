import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SingleProductScreenProps} from '../../common/components/Navigator';
import {useSingleProductQuery} from '../../common/api';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {SingleProduct} from './SingleProduct';

export const SingleProductScreen = () => {
  const {params} = useRoute<SingleProductScreenProps['route']>();
  const {setOptions} = useNavigation();
  const {data, isLoading} = useSingleProductQuery(params.productId);

  useEffect(() => {
    setOptions({headerTitle: data?.title || ''});

    return () => setOptions({headerTitle: ''});
  }, [data, setOptions]);

  return (
    <ScreenRollupWrapper isLoading={isLoading}>
      {data && <SingleProduct data={data} />}
    </ScreenRollupWrapper>
  );
};
