import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text, useTheme} from 'react-native-paper';

export type InternetConnectionBannerProps = {onInfoPress: () => void};

export const InternetConnectionBanner = ({
  onInfoPress,
}: InternetConnectionBannerProps) => {
  const {colors} = useTheme();

  return (
    <View style={[style.wrapper, {backgroundColor: colors.errorContainer}]}>
      <Text variant="labelMedium" style={{color: colors.error}}>
        Internet disconnected
      </Text>
      <IconButton
        icon="information-outline"
        onPress={onInfoPress}
        size={24}
        iconColor={colors.error}
      />
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 32,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
