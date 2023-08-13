import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Text} from 'react-native-paper';
import {SingleProductScreenProps} from '../../common/components/Navigator';
import {useSingleProductQuery} from '../../common/api';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';

export const SingleProductScreen = () => {
  const {params} = useRoute<SingleProductScreenProps['route']>();
  const {setOptions} = useNavigation();
  const {data, isLoading} = useSingleProductQuery(params.productId);

  useEffect(() => {
    setOptions({headerTitle: data?.title});

    return () => setOptions({headerRTitle: ''});
  }, [data, setOptions]);

  return (
    <ScreenRollupWrapper isLoading={isLoading}>
      <Text>{data?.description}</Text>
    </ScreenRollupWrapper>
  );
};
