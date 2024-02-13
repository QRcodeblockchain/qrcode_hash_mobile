import React, {FC} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

interface SearchBarProps {
  onChangeText: (text: string) => void;
  placeholder: string;
}

const SearchBar: FC<SearchBarProps> = ({onChangeText, placeholder}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 45,
    fontSize: 15,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
});

export default SearchBar;
