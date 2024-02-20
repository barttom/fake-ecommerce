import React, {useRef} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';
import {InternetConnectionSnackbar} from './InternetConnectionSnackbar';
import {InternetConnectionBanner} from './InternetConnectionBanner';

export const useInternetConnection = () => {
  const snackbarTimeoutId = useRef<ReturnType<typeof setTimeout>>();
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const {isInternetReachable} = useNetInfo();
  const showSnackbarInfo = () => setIsSnackbarVisible(true);
  const hideSnackbarInfo = () => setIsSnackbarVisible(false);

  const snackbar = (
    <InternetConnectionSnackbar
      visible={isSnackbarVisible}
      onDismiss={hideSnackbarInfo}
      action={{
        label: 'Close',
        onPress: hideSnackbarInfo,
      }}
    />
  );
  const banner = !isInternetReachable ? (
    <InternetConnectionBanner onInfoPress={showSnackbarInfo} />
  ) : null;

  useEffect(() => {
    setIsSnackbarVisible(!isInternetReachable);
  }, [isInternetReachable]);

  useEffect(() => {
    if (isSnackbarVisible) {
      clearTimeout(snackbarTimeoutId.current as number);
      snackbarTimeoutId.current = setTimeout(hideSnackbarInfo, 7000);
    }
    return () => clearTimeout(snackbarTimeoutId.current as number);
  }, [isSnackbarVisible]);

  return {
    snackbar,
    banner,
    isInternetReachable,
  };
};
