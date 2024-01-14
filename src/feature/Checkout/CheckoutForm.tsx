import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {FormProvider, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {DropdownRHF} from '../../common/components/Dropdown';
import {TextFieldRHF} from '../../common/components/TextField/';

export type CheckoutFormProps = {
  onSubmit: (values: CheckoutFormFields) => void;
};
export type CheckoutFormFields = {
  name: string;
  address: string;
  deliveryType: string;
};

const validationSchema = yup
  .object({
    name: yup
      .string()
      .required('Your name should have at least 2 and maximum 100 characters')
      .min(2, 'Your name should have at least 2 and maximum 100 characters')
      .max(100, 'Your name should have at least 2 and maximum 100 characters'),
    address: yup
      .string()
      .required(
        'Your address should have at least 20 and maximum 500 characters',
      )
      .min(
        20,
        'Your address should have at least 20 and maximum 500 characters',
      )
      .max(
        500,
        'Your address should have at least 20 and maximum 500 characters',
      ),
    deliveryType: yup.string().required(),
  })
  .required();

const deliveryOptions = [
  {
    label: 'Post',
    value: 'post',
  },
  {label: 'Courier', value: 'courier'},
];

export const CheckoutForm = ({onSubmit}: CheckoutFormProps) => {
  const formMethods = useForm<CheckoutFormFields>({
    defaultValues: {
      address: '',
      deliveryType: deliveryOptions[0].value,
      name: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const submitValues = (values: CheckoutFormFields) => {
    onSubmit(values);
  };

  return (
    <>
      <ScrollView style={styles.form} bounces={false} scrollEnabled={false}>
        <FormProvider {...formMethods}>
          <TextFieldRHF name="name" label="Name" />
          <TextFieldRHF
            name="address"
            numberOfLines={3}
            multiline
            label="Address"
          />
          <DropdownRHF
            name="deliveryType"
            label="Delivery type"
            options={deliveryOptions}
            initialChosenOption={deliveryOptions[0]}
          />
        </FormProvider>
      </ScrollView>
      <View style={styles.actions}>
        <Button
          mode="contained"
          onPress={formMethods.handleSubmit(submitValues)}>
          Order
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  form: {height: '80%', paddingTop: 24, paddingVertical: 8},
  actions: {
    height: '20%',
    flexDirection: 'column-reverse',
  },
});
