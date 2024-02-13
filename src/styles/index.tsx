import {StyleSheet} from 'react-native';
export * from './colors';
export * from './dimensions';

export const backgroundStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
