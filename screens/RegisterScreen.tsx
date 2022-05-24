import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log(user);
        } catch (error) {
            console.log((error as any).message);
        }
    };

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
                    onChangeText={setEmail}
                    value={email}
                    placeholder="メールアドレスを入力してください"
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
                    onChangeText={setPassword}
                    value={password}
                    placeholder="パスワードを入力してください"
                    // 入力テキストを隠す
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
            </View>
            {/* ビューをタッチ操作に応答させて見せるために不透明度を変化させるラッパー */}
            <TouchableOpacity
                style={{
                    padding: 10,
                    backgroundColor: '#88cb7f',
                    borderRadius: 10,
                }}
                onPress={handleRegister}
            >
                <Text style={{ color: 'white' }}>登録する</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;