import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {FormProvider, useForm} from 'react-hook-form';
import * as yup from 'yup';
import 'yup-phone-lite';
import {yupResolver} from '@hookform/resolvers/yup';
import {DropdownRHF} from '../../common/components/Dropdown';
import {TextFieldRHF} from '../../common/components/TextField/';

export type CheckoutFormProps = {
  onSubmit: (values: CheckoutFormFields) => void;
};
export type CheckoutFormFields = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  street: string;
  postcode: string;
  city: string;
  deliveryType: string;
};
const validationMessages = {
  name: 'Your name should have at least 2 and maximum 100 characters',
  surname: 'Your last name should have at least 2 and maximum 100 characters',
  email: 'You need to add a valid email address',
  city: 'Your city should have at least 3 and maximum 50 characters',
  street: 'Your street should have at least 5 and maximum 100 characters',
  postcode: 'Postcode must be in format 00-000',
  phone: 'Add valid phone number',
};

const validationSchema = yup
  .object({
    name: yup
      .string()
      .required(validationMessages.name)
      .min(2, validationMessages.name)
      .max(100, validationMessages.name),
    surname: yup
      .string()
      .required(validationMessages.surname)
      .min(2, validationMessages.surname)
      .max(100, validationMessages.surname),
    email: yup
      .string()
      .email(validationMessages.email)
      .required(validationMessages.email),
    city: yup
      .string()
      .required(validationMessages.city)
      .min(3, validationMessages.city)
      .max(50, validationMessages.city),
    street: yup
      .string()
      .required(validationMessages.street)
      .min(5, validationMessages.street)
      .max(100, validationMessages.street),
    postcode: yup
      .string()
      .length(6, validationMessages.postcode)
      .matches(/^[0-9]{2}-[0-9]{3}/, validationMessages.postcode)
      .required(validationMessages.postcode),
    phone: yup.string().phone('PL').required(validationMessages.phone),
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
      street: '',
      deliveryType: deliveryOptions[0].value,
      name: '',
      surname: '',
      city: '',
      phone: '',
      postcode: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const submitValues = (values: CheckoutFormFields) => {
    onSubmit(values);
  };

  return (
    <FormProvider {...formMethods}>
      <TextFieldRHF name="name" label="First name" />
      <TextFieldRHF name="surname" label="Last name" />
      <TextFieldRHF name="email" label="Email" />
      <TextFieldRHF name="street" numberOfLines={2} multiline label="Street" />
      <TextFieldRHF name="postcode" label="Postcode" />
      <TextFieldRHF name="city" label="City" />
      <TextFieldRHF name="phone" label="Phone number" />
      <DropdownRHF
        name="deliveryType"
        label="Delivery type"
        options={deliveryOptions}
        initialChosenOption={deliveryOptions[0]}
      />
      <Button
        mode="contained"
        style={styles.submitButton}
        onPress={formMethods.handleSubmit(submitValues)}>
        Order
      </Button>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    marginVertical: 32,
  },
});
