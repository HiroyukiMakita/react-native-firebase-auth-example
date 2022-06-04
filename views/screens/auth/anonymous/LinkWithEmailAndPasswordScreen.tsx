import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TouchableOpacity } from 'react-native';
import { EmailAuthProvider, linkWithCredential, updateCurrentUser } from 'firebase/auth';
import { auth } from '../../../../lib/firebase';
import { EmailInput } from '../../../components/atoms/form/EmailInput';
import { PasswordInput } from '../../../components/atoms/form/PasswordInput';
import { useNavigation } from '@react-navigation/native';

const LinkWithEmailAndPasswordScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLink = async () => {
        if (auth.currentUser === null) {
            console.log('currentUser is null.');
            return;
        }
        try {
            const credential = EmailAuthProvider.credential(email, password);
            const userCredential = await linkWithCredential(auth.currentUser, credential);
            console.log('link with email and password success: ', userCredential);
            await updateCurrentUser(auth, userCredential.user)
                .then(() => console.log('currentUser updated.'))
                .catch((error) => {
                    console.log(error.message);
                });
            navigation.navigate('Home' as never);
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
            <Text>ユーザ登録画面</Text>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>(email・password 認証へ昇格)</Text>
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
                onPress={handleLink}
            >
                <Text style={{ color: 'white' }}>email・password 認証ユーザーに昇格</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default LinkWithEmailAndPasswordScreen;