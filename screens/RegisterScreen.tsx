import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

const RegisterScreen = () => {

    return (
        // キーボードに重ならない View
        <KeyboardAvoidingView
            behavior="padding"
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}
        >
            {/* フォーム設定場所 */}
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;