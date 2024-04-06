import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface LinearGradientViewProps {
  colors: string[];
  style?: ViewStyle;
}

const LinearGradientView: React.FC<LinearGradientViewProps> = ({
  colors,
  style,
}) => {
  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 0.9, y: 0}}
      colors={colors}
      style={[styles.linearGradient, style]}
    />
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});

export default LinearGradientView;
