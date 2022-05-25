import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    GestureResponderEvent,
} from 'react-native';
import { auth } from '../../lib/firebase';
import { EmailInput } from '../components/atoms/form/EmailInput';
import { PasswordInput } from '../components/atoms/form/Password';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event: GestureResponderEvent) => {
        await signInWithEmailAndPassword(auth, email, password).catch((error) => {
            console.log(error.message);
        });
    };

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}
        >
            <Text style={{ fontSize: 20, marginBottom: 20 }}>ログイン画面</Text>
            <View style={{ marginBottom: 20 }}>
                <EmailInput value={email} setValue={setEmail} />
            </View>
            <View style={{ marginBottom: 20 }}>
                <PasswordInput value={password} setValue={setPassword} />
            </View>
            <TouchableOpacity
                style={{
                    padding: 10,
                    backgroundColor: '#88cb7f',
                    borderRadius: 10,
                }}
                onPress={handleLogin}
                disabled={!email || !password}
            >
                <Text style={{ color: 'white' }}>ログイン</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;