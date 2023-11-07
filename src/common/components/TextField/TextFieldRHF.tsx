import React from 'react';
import {useController, useFormContext} from 'react-hook-form';
import {TextField, TextFieldProps} from './TextField';

export type TextFieldRHFProps = Omit<
  TextFieldProps,
  'value' | 'onChangeText'
> & {name: string};

export const TextFieldRHF = ({name, ...props}: TextFieldRHFProps) => {
  const {control} = useFormContext();
  const {field, fieldState} = useController({control, name});

  return (
    <TextField
      onChangeText={field.onChange}
      value={field.value}
      error={fieldState.error?.message}
      {...props}
    />
  );
};
