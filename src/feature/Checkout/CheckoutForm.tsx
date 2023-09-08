import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {Dropdown} from '../../common/components/Dropdown';

export type CheckoutFormProps = {onSubmit: () => void};
type ErrorState = {
  name?: string;
  address?: string;
};

const deliveryOptions = [
  {
    label: 'Post',
    value: 'post',
  },
  {label: 'Courier', value: 'courier'},
];
const initialErrors = {
  name: '',
  address: '',
};
const nameValidator = (value: string) => value.length > 1 && value.length < 101;
const addressValidator = (value: string) =>
  value.length > 19 && value.length < 501;

export const CheckoutForm = ({onSubmit}: CheckoutFormProps) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [, setDeliveryType] = useState('');
  const [errors, setErrors] = useState<ErrorState>({...initialErrors});

  const handleSubmit = () => {
    const tempErrors = {...initialErrors};
    const isNameValid = nameValidator(name);
    const isAddressValid = addressValidator(address);

    tempErrors.name = isNameValid
      ? ''
      : 'Your name should have at least 2 and maximum 100 characters';
    tempErrors.address = isAddressValid
      ? ''
      : 'Your address should have at least 20 and maximum 500 characters';

    setErrors(tempErrors);

    if (isAddressValid && isNameValid) {
      onSubmit();
    }
  };

  return (
    <>
      <ScrollView style={styles.form}>
        <TextInput
          accessibilityLabel="Name input field"
          onChangeText={setName}
          value={name}
          label="Name"
          error={!!errors.name}
        />
        <HelperText type="error" visible={!!errors.name}>
          {errors.name}
        </HelperText>
        <TextInput
          accessibilityLabel="Address input field"
          onChangeText={setAddress}
          numberOfLines={3}
          multiline
          value={address}
          label="Address"
          error={!!errors.address}
        />
        <HelperText type="error" visible={!!errors.address}>
          {errors.address}
        </HelperText>
        <Dropdown
          label="Delivery type"
          options={deliveryOptions}
          onSelect={newValue => setDeliveryType(newValue as string)}
          initialChosenOption={deliveryOptions[0]}
        />
      </ScrollView>
      <View style={styles.actions}>
        <Button mode="contained" onPress={handleSubmit}>
          Order
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  form: {height: '80%'},
  actions: {
    height: '20%',
    flexDirection: 'column-reverse',
  },
});
