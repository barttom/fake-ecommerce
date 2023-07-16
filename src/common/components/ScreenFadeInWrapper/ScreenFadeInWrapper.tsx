import React, {ReactNode, useRef} from 'react';
import {Animated} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

export type ScreenFadeInWrapperProps = {
  animationDuration?: number;
  children: ReactNode;
};

export const ScreenFadeInWrapper = ({
  animationDuration = 500,
  children,
}: ScreenFadeInWrapperProps) => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useFocusEffect(() => {
    Animated.timing(animatedOpacity, {
      useNativeDriver: false,
      toValue: 1,
      duration: animationDuration,
    }).start();

    return () => {
      Animated.timing(animatedOpacity, {
        useNativeDriver: false,
        toValue: 0,
        duration: 0,
      }).start();
    };
  });
  return (
    <Animated.View style={{opacity: animatedOpacity}}>{children}</Animated.View>
  );
};
