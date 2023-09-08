import React, {ReactNode, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {ActivityIndicator, useTheme} from 'react-native-paper';

export type ScreenRollupWrapperProps = {
  children: ReactNode;
  animationDuration?: number;
  initialSize?: number;
  backgroundColor?: string;
  animationColor?: string;
  isLoading?: boolean;
};
const FADE_IN_DURATION = 200;

export const ScreenRollupWrapper = ({
  children,
  animationDuration = 800,
  initialSize = 10,
  backgroundColor,
  animationColor,
  isLoading = false,
}: ScreenRollupWrapperProps) => {
  const animatedWidth = useRef(new Animated.Value(initialSize)).current;
  const animatedHeight = useRef(new Animated.Value(initialSize)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const duration = (animationDuration - FADE_IN_DURATION) / 2;
  const {colors} = useTheme();

  useFocusEffect(() => {
    if (!isLoading && children) {
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
    }

    return () => {
      animatedWidth.setValue(initialSize);
      animatedHeight.setValue(initialSize);
      animatedOpacity.setValue(0);
    };
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator accessibilityLabel="Loading indicator" size={50} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
          backgroundColor: animationColor || colors.surface,
        }}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: animatedOpacity,
              backgroundColor: backgroundColor || colors.background,
            },
          ]}>
          {children}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
