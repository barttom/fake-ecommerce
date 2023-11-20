import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {
  Button,
  Divider,
  Surface,
  Text,
  useTheme,
  TextInput,
} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';

import {TextFieldRHF} from '../../common/components/TextField';

export type AuthFormProps = {
  onSubmit: (values: AuthFormValues) => void;
};
type AuthFormValues = {
  username: string;
  password: string;
};
const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   'Password must contain:' +
  //     '\n- at least eight characters,' +
  //     '\n- at least one number' +
  //     '\n- both lower and uppercase letters' +
  //     '\n- at least special characters',
  // ),
});

export const AuthForm = ({onSubmit}: AuthFormProps) => {
  const [isPasswordHide, setIsPasswordHide] = useState(true);

  const {colors} = useTheme();
  const formMethods = useForm<AuthFormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const signIn = (values: AuthFormValues) => {
    onSubmit(values);
  };

  return (
    <Surface elevation={4} style={styles.wrapper}>
      <Text
        variant="titleMedium"
        style={[styles.title, {borderColor: colors.outlineVariant}]}>
        Sign in
      </Text>
      <Divider />
      <FormProvider {...formMethods}>
        <TextFieldRHF name="username" label="Username" />
        <TextFieldRHF
          name="password"
          label="Password"
          secureTextEntry={isPasswordHide}
          right={
            <TextInput.Icon
              icon={isPasswordHide ? 'eye' : 'eye-off'}
              onPress={() => setIsPasswordHide(!isPasswordHide)}
            />
          }
        />
        <Button mode="contained" onPress={formMethods.handleSubmit(signIn)}>
          Log in
        </Button>
      </FormProvider>
    </Surface>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    marginVertical: 16,
  },
  title: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
});
