import React from 'react';
import { TextInput } from 'react-native';

export const PasswordInput = ({ value, setValue }: { value: string, setValue: React.Dispatch<React.SetStateAction<string>>; }) => {
    return (
        <TextInput
            style={{
                width: 250,
                borderWidth: 1,
                padding: 5,
                borderColor: 'gray',
            }}
            onChangeText={setValue}
            value={value}
            placeholder="パスワードを入力してください"
            // 入力テキストを隠す
            secureTextEntry={true}
            autoCapitalize="none"
        />
    );
};