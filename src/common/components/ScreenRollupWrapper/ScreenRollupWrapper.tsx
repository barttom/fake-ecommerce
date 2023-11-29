import React, {ReactNode, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {ActivityIndicator, useTheme} from 'react-native-paper';

export type ScreenRollupWrapperProps = ScreenRollupWrapperContentProps & {
  isLoading?: boolean;
};
type ScreenRollupWrapperContentProps = {
  children: ReactNode;
  animationDuration?: number;
  initialSize?: number;
  backgroundColor?: string;
  animationColor?: string;
};
const FADE_IN_DURATION = 200;

export const ScreenRollupWrapper = ({
  isLoading = false,
  children,
  ...props
}: ScreenRollupWrapperProps) => {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator accessibilityLabel="Loading indicator" size={50} />
      ) : (
        <ScreenRollupWrapperContent {...props}>
          {children}
        </ScreenRollupWrapperContent>
      )}
    </View>
  );
};

const ScreenRollupWrapperContent = ({
  children,
  animationDuration = 800,
  initialSize = 10,
  backgroundColor,
  animationColor,
}: ScreenRollupWrapperContentProps) => {
  const animatedWidth = useRef(new Animated.Value(initialSize)).current;
  const animatedHeight = useRef(new Animated.Value(initialSize)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const duration = (animationDuration - FADE_IN_DURATION) / 2;
  const {colors} = useTheme();

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
        backgroundColor: animationColor || colors.backdrop,
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
