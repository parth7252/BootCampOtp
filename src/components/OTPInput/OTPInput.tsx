import React, { useEffect, useRef } from 'react';
import { View, TextInput, Keyboard, Platform, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import styles from './styles';

interface Props {
  value: string[];
  onChange: (v: string[]) => void;
}

const OTPInput = ({ value, onChange }: Props): JSX.Element => {
  const inputRef = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const firstEmpty = value.findIndex((v) => v === '');
    const idx = firstEmpty >= 0 ? firstEmpty : 0;
    inputRef.current[idx]?.focus();
  }, []);

  const handleChange = (text: string, index: number) => {
    const digitOnly = text.replace(/[^0-9]/g, '');

    if (digitOnly.length >= 4) {
      const arr = digitOnly.slice(0, 4).split('');
      onChange(arr);
      Keyboard.dismiss();
      return;
    }

    const newVal = [...value];
    newVal[index] = digitOnly.slice(-1);
    onChange(newVal);

    if (digitOnly && index < 3) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && value[index] === '' && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {value.map((val, i) => (
        <TextInput
          key={i}
          ref={(ref) => (inputRef.current[i] = ref)}
          style={styles.box}
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          maxLength={4}
          value={val}
          onChangeText={(t) => handleChange(t, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          accessible
          accessibilityLabel={`OTP digit ${i + 1}`}
          returnKeyType="done"
        />
      ))}
    </View>
  );
};

export default OTPInput;
