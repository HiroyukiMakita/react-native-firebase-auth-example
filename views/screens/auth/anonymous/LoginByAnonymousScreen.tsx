import React, { useState } from 'react';
import { signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    GestureResponderEvent,
} from 'react-native';
import { auth } from '../../../../lib/firebase';
import { useNavigation } from '@react-navigation/native';

const LoginByAnonymousScreen = () => {
    const handleLogin = async (event: GestureResponderEvent) => {
        await signInAnonymously(auth)
            .then((response) => {
                console.log('signInAnonymously success: ', response);
            })
            .catch((error) => {
                console.log('signInAnonymously failed: ', error.message);
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
            <Text style={{ fontSize: 20, marginBottom: 20 }}>(匿名認証)</Text>
            <TouchableOpacity
                style={{
                    padding: 10,
                    backgroundColor: '#88cb7f',
                    borderRadius: 10,
                }}
                onPress={handleLogin}
            >
                <Text style={{ color: 'white' }}>ログイン</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={{ marginTop: 10 }}
                onPress={toRegisterScreen}
            >
                <Text>ユーザ登録はこちら(email・password)</Text>
            </TouchableOpacity> */}
        </KeyboardAvoidingView>
    );
};

export default LoginByAnonymousScreen;