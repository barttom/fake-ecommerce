import React from 'react';
import {useController, useFormContext} from 'react-hook-form';
import {Dropdown, DropdownProps} from './Dropdown';

export type DropdownRHFProps = Omit<DropdownProps, 'onSelect'> & {name: string};

export const DropdownRHF = ({name, ...props}: DropdownRHFProps) => {
  const {control} = useFormContext();
  const {field} = useController({control, name});

  return <Dropdown onSelect={field.onChange} {...props} />;
};
