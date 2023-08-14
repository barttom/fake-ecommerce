import React from 'react';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';

export type ImageSliderProps = {
  images: Array<string>;
};
const {width, height: screenHeight} = Dimensions.get('screen');
const height = screenHeight / 2;

export const ImageSlider = ({images}: ImageSliderProps) => {
  return (
    <FlatList
      style={styles.container}
      horizontal
      pagingEnabled
      data={images}
      renderItem={({item}) => (
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={{
              uri: item,
            }}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    marginBottom: 24,
  },
  slide: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    flex: 0.9,
  },
});
