import React, {ReactNode, useRef} from 'react';
import {Animated, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

export type ScreenRollupWrapperProps = {
  children: ReactNode;
  animationDuration?: number;
  initialSize?: number;
  backgroundColor?: string;
  animationColor?: string;
};
const FADE_IN_DURATION = 200;

export const ScreenRollupWrapper = ({
  children,
  animationDuration = 800,
  initialSize = 10,
  backgroundColor = '#c5e1fd',
  animationColor = '#6699cc',
}: ScreenRollupWrapperProps) => {
  const animatedWidth = useRef(new Animated.Value(initialSize)).current;
  const animatedHeight = useRef(new Animated.Value(initialSize)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const duration = (animationDuration - FADE_IN_DURATION) / 2;

  useFocusEffect(() => {
    Animated.sequence([
      Animated.timing(animatedWidth, {
        toValue: 100,
        useNativeDriver: false,
        duration,
      }),
      Animated.timing(animatedHeight, {
        toValue: 100,
        useNativeDriver: false,
        duration,
      }),
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: FADE_IN_DURATION,
        useNativeDriver: false,
      }),
    ]).start();

    return () => {
      animatedWidth.setValue(initialSize);
      animatedHeight.setValue(initialSize);
      animatedOpacity.setValue(0);
    };
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.View
        style={{
          width: animatedWidth.interpolate({
            inputRange: [0, 100],
            outputRange: [`0%`, '100%'],
          }),
          height: animatedHeight.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
          backgroundColor: animationColor,
        }}>
        <Animated.View
          style={{
            opacity: animatedOpacity,
            backgroundColor: backgroundColor,
            flex: 1,
          }}>
          {children}
        </Animated.View>
      </Animated.View>
    </View>
  );
};
