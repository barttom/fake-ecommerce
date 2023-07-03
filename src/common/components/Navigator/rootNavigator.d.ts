import {NativeStackScreenProps} from 'react-native-screens/native-stack';

type RootStackParamList = {
  Home: undefined;
  Contact: undefined;
};
export type HomeScreenParams = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type ContactScreenParams = NativeStackScreenProps<
  RootStackParamList,
  'Contact'
>;
