import React from 'react';
import { TextInput } from 'react-native';

export const PhoneNumberInput = ({ value, setValue }: { value: string, setValue: React.Dispatch<React.SetStateAction<string>>; }) => {
    return (
        <TextInput
            style={{ marginVertical: 10, fontSize: 17 }}
            placeholder="+81 999 999 9999"
            autoFocus
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            onChangeText={setValue}
            value={value}
        />
    );
};