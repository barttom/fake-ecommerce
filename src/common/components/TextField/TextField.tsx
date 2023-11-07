import React, {useMemo} from 'react';
import {HelperText, TextInput, TextInputProps} from 'react-native-paper';

export type TextFieldProps = Omit<TextInputProps, 'error'> & {error?: string};

export const TextField = ({error, ...props}: TextFieldProps) => {
  const isError = useMemo(() => !!error, [error]);

  return (
    <>
      <TextInput
        accessibilityLabel={`${props.label} input field`}
        error={isError}
        style={{minHeight: props.numberOfLines ? props.numberOfLines * 32 : 24}}
        {...props}
      />
      <HelperText type="error" visible={isError}>
        {error}
      </HelperText>
    </>
  );
};
