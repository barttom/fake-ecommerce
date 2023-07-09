import React from 'react';
import {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avatar} from 'react-native-paper';
import {ContactScreenParams} from '../../common/components/Navigator';

export const ContactScreen = () => {
  const {navigate} = useNavigation<ContactScreenParams['navigation']>();

  return (
    <View>
      <Button title="Goto Home" onPress={() => navigate('Home')} />
      <Text>Contact</Text>
      <View>
        <Avatar.Icon size={30} icon="folder" />
      </View>
    </View>
  );
};
