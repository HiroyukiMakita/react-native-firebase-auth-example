import React from 'react';
import { TextInput } from 'react-native';

export const VerificationCodeInput = ({ value, setValue }: { value: string, setValue: React.Dispatch<React.SetStateAction<string>>; }) => {
    return (
        <TextInput
            style={{ marginVertical: 10, fontSize: 17 }}
            editable={!!value}
            placeholder="123456"
            onChangeText={setValue}
        />
    );
};