import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../lib/firebase';
import { EmailInput } from '../../../components/atoms/form/EmailInput';
import { PasswordInput } from '../../../components/atoms/form/Password';

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
            <Text style={{ fontSize: 20, marginBottom: 20 }}>ユーザ登録画面(email・password)</Text>
            <View style={{ marginBottom: 20 }}>
                <EmailInput value={email} setValue={setEmail} />
            </View>
            <View style={{ marginBottom: 20 }}>
                <PasswordInput value={password} setValue={setPassword} />
            </View>
            {/* ビューをタッチ操作に応答させて見せるために不透明度を変化させるラッパー */}
            <TouchableOpacity
                style={{
                    padding: 10,
                    backgroundColor: '#88cb7f',
                    borderRadius: 10,
                }}
                disabled={!email || !password}
                onPress={handleRegister}
            >
                <Text style={{ color: 'white' }}>登録する</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;