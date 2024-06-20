import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {
  Button,
  Divider,
  Surface,
  Text,
  useTheme,
  TextInput,
  Snackbar,
} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';

import {TextFieldRHF} from '../../common/components/TextField';
import {
  useAuthenticateUserMutation,
  useLazyAuthenticatedUserQuery,
} from '../../common/api';

export type AuthFormValues = {
  username: string;
  password: string;
};
const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const AuthForm = () => {
  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [displayError, setDisplayError] = useState(false);
  const [sendAuthCredentials, {error, isError}] = useAuthenticateUserMutation();

  const [fetchAuthenticatedUser] = useLazyAuthenticatedUserQuery();
  const onSubmit = async (values: AuthFormValues) => {
    await sendAuthCredentials(values);
    fetchAuthenticatedUser();
  };

  const {colors} = useTheme();
  const formMethods = useForm<AuthFormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const errorMessage = `Server error: ${
    (error as {data: {message: string}})?.data?.message
  }`;
  const signIn = (values: AuthFormValues) => {
    onSubmit(values);
  };

  useEffect(() => {
    setDisplayError(isError);
  }, [isError]);

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
              accessibilityLabel={
                isPasswordHide ? 'Show password button' : 'Hide password button'
              }
              icon={isPasswordHide ? 'eye' : 'eye-off'}
              onPress={() => setIsPasswordHide(!isPasswordHide)}
            />
          }
        />
        <Button mode="contained" onPress={formMethods.handleSubmit(signIn)}>
          Log in
        </Button>
      </FormProvider>
      <Snackbar
        visible={displayError}
        onDismiss={() => setDisplayError(false)}
        duration={3000}>
        {errorMessage}
      </Snackbar>
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
