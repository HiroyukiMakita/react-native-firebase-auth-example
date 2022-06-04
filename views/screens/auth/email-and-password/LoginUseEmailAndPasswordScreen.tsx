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
import { auth } from '../../../../lib/firebase';
import { EmailInput } from '../../../components/atoms/form/EmailInput';
import { PasswordInput } from '../../../components/atoms/form/Password';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();

    const toRegisterScreen = () => navigation.navigate('Register' as never);
    const toLoginByAnonymousScreen = () => navigation.navigate('LoginByAnonymousScreen' as never);
    const toRegisterUsePhoneNumberScreen = () => navigation.navigate('RegisterUsePhoneNumberScreen' as never);

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
            <Text >ログイン画面</Text>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>(email・password)</Text>
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
            <TouchableOpacity
                style={{ marginTop: 10 }}
                onPress={toRegisterScreen}
            >
                <Text>ユーザ登録はこちら(email・password)</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginTop: 10 }}
                onPress={toLoginByAnonymousScreen}
            >
                <Text>匿名認証はこちら</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginTop: 10 }}
                onPress={toRegisterUsePhoneNumberScreen}
            >
                <Text>電話番号認証はこちら</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;