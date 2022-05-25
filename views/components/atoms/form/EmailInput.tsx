import React from 'react';
import { TextInput } from 'react-native';

export const EmailInput = ({ value, setValue }: { value: string, setValue: React.Dispatch<React.SetStateAction<string>>; }) => {
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
            placeholder="メールアドレスを入力してください"
            // 特定の文字を自動で大文字にする属性を無効
            autoCapitalize="none"
            // 入力時に表示される候補を表示する属性を無効
            autoCorrect={false}
        />
    );
};