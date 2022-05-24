import React from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity } from 'react-native';

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
            <Text style={{ fontSize: 20, marginBottom: 20 }}>ユーザ登録画面</Text>
            <View style={{ marginBottom: 20 }}>
                <TextInput
                    style={{
                        width: 250,
                        borderWidth: 1,
                        padding: 5,
                        borderColor: 'gray',
                    }}
                    // 特定の文字を自動で大文字にする属性を無効
                    autoCapitalize="none"
                    // 入力時に表示される候補を表示する属性を無効
                    autoCorrect={false}
                />
            </View>
            <View style={{ marginBottom: 20 }}>
                <TextInput
                    style={{
                        width: 250,
                        borderWidth: 1,
                        padding: 5,
                        borderColor: 'gray',
                    }}
                    placeholder="パスワードを入力してください"
                    // 入力テキストを隠す
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
            </View>
            <TouchableOpacity
                style={{
                    padding: 10,
                    backgroundColor: '#88cb7f',
                    borderRadius: 10,
                }}
            >
                <Text style={{ color: 'white' }}>登録する</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;