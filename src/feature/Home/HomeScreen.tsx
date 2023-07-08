import React from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenParams} from '../../common/components/Navigator';
import {useAllProductsQuery} from '../../common/api';

export const HomeScreen = () => {
  const {navigate} = useNavigation<HomeScreenParams['navigation']>();
  const {isLoading, data} = useAllProductsQuery();

  if (isLoading) {
    return null;
  }

  return (
    <View>
      <Button title="Goto Contact" onPress={() => navigate('Contact')} />
      <Text>Home</Text>
      <FlatList
        data={data?.products}
        renderItem={({item, index}) => (
          <Text>{`${index + 1}. ${item.title}`}</Text>
        )}
      />
    </View>
  );
};
