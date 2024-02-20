import React from 'react';
import {Snackbar, SnackbarProps} from 'react-native-paper';

export type InternetConnectionSnackbarProps = Omit<SnackbarProps, 'children'>;

export const InternetConnectionSnackbar = (
  props: InternetConnectionSnackbarProps,
) => {
  return (
    <Snackbar {...props}>
      🚨 Internet connection is no available now. Browsing products and checkout
      doesn&apos;t work properly. Please find connection to continue using app
    </Snackbar>
  );
};
